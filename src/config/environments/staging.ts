import { Config, Cookie } from '../../@types';

const staging: Pick<Config, 'env'> & Cookie = {
  env: 'STAGING',
  cookie: {
    secret: process.env.COOKIE_SECRET!,
    options: {
      // httpOnly: false,
      domain: process.env.COOKIE_DOMAIN!,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    },
  },
};

export default staging;
