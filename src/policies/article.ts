import * as yup from 'yup';

import validate from './index';

import { titleValidator, UrlValidator } from './shared';

export const createArticleValidator = validate({
  title: titleValidator.required(),
  content: yup.string(),
  documentUrl: UrlValidator.required(),
});
