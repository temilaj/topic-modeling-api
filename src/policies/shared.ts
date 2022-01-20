import * as yup from 'yup';

import errorMessages from '../utils/errorMessages';

export const passwordValidator = yup.string().min(6, errorMessages.passwordLengthError).max(128);

export const nameValidator = yup.string().trim().min(2, errorMessages.nameLengthError).max(40);
export const titleValidator = yup.string().trim().min(2, errorMessages.titleLengthError).max(512);
export const IDValidator = yup.string();

export const emailValidator = yup
  .string()
  .trim()
  .min(3, errorMessages.emailLengthError)
  .max(255)
  .email(errorMessages.invalidEmail);

export const imageUrlValidator = yup.string().url().trim();
export const UrlValidator = yup.string().url().trim();
