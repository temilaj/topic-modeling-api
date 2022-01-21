import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { sendJSONResponse } from './helpers';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Internal Server error ${err.message}`);

  if (err.status === 400) {
    sendJSONResponse(res, err.status, null, 'There seems to be a problem with your request.');
  }
  sendJSONResponse(res, 500, null, 'Something Went Wrong!');
}

export default errorHandler;
