import * as yup from 'yup';

import validate from './index';

export const getSignedUrlValidator = validate({
  fileName: yup.string().required(),
  uploadType: yup.string().required(),
  fileType: yup.string().required(),
  fileExt: yup.string().required(),
});
