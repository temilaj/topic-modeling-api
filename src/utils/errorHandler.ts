import { Request, Response } from 'express';
import logger from '../config/logger';
import { sendJSONResponse } from './helpers';

const errorHandler = function (err: any, req: Request, res: Response): Response<any> {
  logger.error(`Internal Server error ${err.message}`);
  if (err.status === 400) {
    return sendJSONResponse(res, err.status, null, 'There seems to be a problem with your request.');
  }
  return sendJSONResponse(res, 500, null, 'Something Went Wrong!');
};

export default errorHandler;
