import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

import config from '../config/environments';
import { IUserDocument } from '../models/User';

type Paginate = {
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export function signToken(user: IUserDocument, duration?: string): string {
  const { id, email } = user;

  return jwt.sign(
    {
      sub: id,
      email,
    },
    config.authTokenSecret,
    {
      issuer: config.appURL,
      expiresIn: duration || '7d',
    },
  );
}

export function signRefreshToken(user: IUserDocument): string {
  const { id, refreshTokenVersion } = user;
  return jwt.sign(
    {
      sub: id,
      tokenVersion: refreshTokenVersion,
    },
    config.refreshTokenSecret,
    {
      issuer: config.appURL,
      expiresIn: '7d',
    },
  );
}

export function sendJSONResponse(res: Response, status: number, data: Record<string, unknown> | null, message: string) {
  return res.status(status).json({
    message,
    data,
  });
}

export function getCurrentTimeStamp(): number {
  return Math.floor(new Date().getTime());
}

export function getTimeStamp(date: number | Date): number {
  return Math.floor(new Date(date).getTime());
}

export function getQueryOptions(request: Request): { limit: number; page: number } {
  const { limit, page } = request.query;
  const parsedLimit = parseInt(<string>limit, 10) || 10;

  const options = { limit: Math.min(parsedLimit, 50), page: parseInt(<string>page, 10) || 1 };
  return options;
}

export function paginate(total: number, pageSize: number, offset: number): Paginate {
  const currentIndex = Math.max(total - Math.floor(offset / pageSize) * pageSize, 0);
  return {
    pageNumber: Math.floor(offset / pageSize) + 1,
    pageCount: Math.ceil(total / pageSize),
    pageSize: Math.min(currentIndex, pageSize),
    total,
  };
}

export function catchErrors(fn: any): RequestHandler {
  const caught = (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
  return caught;
}

export function isValidId(Id: string): boolean {
  const { ObjectId } = mongoose.Types;
  if (ObjectId.isValid(Id)) {
    return String(new ObjectId(Id)) === Id;
  }
  return false;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

export function escapeRegex(regexString: string): string {
  return regexString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export async function downloadFile(url: string) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    console.log({ body });
    return body;
  } catch (error) {
    console.error(error);
    return '';
  }
}
