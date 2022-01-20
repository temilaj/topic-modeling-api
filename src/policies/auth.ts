import validate from './index';

import { emailValidator, passwordValidator, nameValidator } from './shared';

export const loginValidator = validate({ email: emailValidator.required(), password: passwordValidator.required() });

export const signUpValidator = validate({
  email: emailValidator.required(),
  password: passwordValidator.required(),
  firstName: nameValidator.required(),
  lastName: nameValidator.required(),
});
