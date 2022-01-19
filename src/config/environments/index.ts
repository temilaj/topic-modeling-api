import { Config, Cookie } from '../../@types';
import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';

const environment = process.env.NODE_ENV;
const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';

const baseConfig: Omit<Config, 'env'> = {
  appURL: process.env.APP_URL!,
  apiURL: process.env.API_URL!,
  port: Number(process.env.PORT) || 9000,
  authTokenSecret: process.env.AUTH_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  logLevel: process.env.LOGLEVEL || 'fatal',
  database: {
    URI: process.env.DATABASE_URI!,
  },
  aws: {
    s3: {
      secretAccessKey: process.env.AWS_ACCESS_KEY!,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      region: process.env.AWS_REGION!,
      bucket: process.env.AWS_BUCKET!,
      coreImageDirectory: process.env.CORE_IMAGE_DIRECTORY!,
      articleDirectory: process.env.ARTICLE_DIRECTORY!,
      userImageDirectory: process.env.USER_IMAGE_DIRECTORY!,
    },
  },
};

let environmentConfig: Config & Cookie;

switch (environment) {
  case 'development':
    environmentConfig = { ...baseConfig, ...developmentConfig };
    break;
  case 'staging':
    environmentConfig = { ...baseConfig, ...stagingConfig };
    break;
  case 'production':
    environmentConfig = { ...baseConfig, ...productionConfig };
    break;
  default:
    environmentConfig = { ...baseConfig, ...developmentConfig };
    break;
}
const configuration = {
  ...environmentConfig,
  isProduction: production,
  isDevelopment: development,
};

export default configuration;
