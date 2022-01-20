import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/environments';
import { sendJSONResponse } from '../utils/helpers';
import errorMessages from '../utils/errorMessages';

import { SignedTokenData, DecodedUser } from '../@types';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  if (!token) {
    return sendJSONResponse(res, 401, {}, errorMessages.invalidRequest);
  }

  try {
    const decoded = jwt.verify(token, config.authTokenSecret) as SignedTokenData;
    const { sub, email } = decoded;
    const user: DecodedUser = {
      userId: sub,
      email,
    };
    req.isAuthenticated = true;
    req.user = user;
    return next();
  } catch (err) {
    return sendJSONResponse(res, 401, {}, errorMessages.authTokenExpired);
  }
};
