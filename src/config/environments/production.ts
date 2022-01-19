import { Config, Cookie } from '../../@types';

const production: Pick<Config, 'env' | 'isProduction'> & Cookie = {
  env: 'PRODUCTION',
  isProduction: true,
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

export default production;
