export type Config = {
  env: string;
  isProduction?: boolean;
  isDevelopment?: boolean;
  port: number;
  apiURL: string;
  appURL: string;
  authTokenSecret: string;
  refreshTokenSecret: string;
  logLevel: string;
  database: {
    URI: string;
  };
  aws: {
    s3: {
      secretAccessKey: string;
      accessKeyId: string;
      region: string;
      bucket: string;
      coreImageDirectory: string;
      articleDirectory: string;
      userImageDirectory: string;
    };
  };
};

type CookieOptions = {
  // httpOnly: boolean;
  domain: string;
  maxAge: number;
  path: string;
  secure: boolean;
};

export type Cookie = {
  cookie: {
    secret: string;
    options: CookieOptions;
  };
};

export interface RefreshTokenData {
  sub: string;
  tokenVersion: number;
}

export interface DecodedUser {
  userId: string;
  email: string;
}

export interface SignedTokenData {
  sub: string;
  email: string;
}

declare module 'express' {
  export interface Request {
    user?: DecodedUser;
    isAuthenticated?: boolean;
    files?: Array<Files>;
  }
}
