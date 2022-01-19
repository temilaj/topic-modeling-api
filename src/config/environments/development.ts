import { Config, Cookie } from '../../@types';

const development: Pick<Config, 'env' | 'isDevelopment'> & Cookie = {
  env: 'DEVELOPMENT',
  isDevelopment: true,
  cookie: {
    secret: process.env.COOKIE_SECRET!,
    options: {
      // httpOnly: false,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    },
  },
};

export default development;
