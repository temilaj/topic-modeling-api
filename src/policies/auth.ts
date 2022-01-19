import validate from './index';

import { emailValidator, passwordValidator, nameValidator } from './shared';

export const loginValidator = validate({ email: emailValidator.required(), password: passwordValidator.required() });

export const signUpValidator = validate({
  email: emailValidator.trim().required(),
  password: passwordValidator.trim().required(),
  firstName: nameValidator.trim().required(),
  lastName: nameValidator.trim().required(),
});
