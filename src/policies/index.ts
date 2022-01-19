import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';
import { sendJSONResponse } from '../utils/helpers';

type validated = { validData?: Record<string, unknown> };
type validatedRequest = validated & Request;

type FormattedError = {
  errors: Record<string, unknown>;
};
const validate =
  (shape: any) =>
  async (req: validatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const schema = yup.object().shape(shape);
    try {
      const validData = await schema.validate(req.body, { abortEarly: false });
      req.validData = validData;
      return next();
    } catch (error: unknown) {
      const errors: FormattedError = {
        errors: {},
      };
      (error as yup.ValidationError).inner.forEach((err) => {
        const { path, message } = err;
        if (path) {
          errors.errors[path] = message;
        }
      });
      return sendJSONResponse(res, 400, { ...errors }, 'error validating data');
    }
  };

export default validate;
