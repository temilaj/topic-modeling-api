const errorMessages = {
  unAuthenticated: 'You must be logged in to do that',
  unAuthorized: 'You are not authorized to perform this action',
  invalidRequest: 'Invalid Request',
  authTokenExpired: 'Authorization Token Expired',
  notFound: 'Not Found',
  passwordMismatch: 'Passwords do not match',
  duplicateEmail: 'This email has already been taken',
  invalidCredentials: 'Invalid email or password',
  invalidEmail: 'email must be a valid email',
  emailLengthError: 'email must be at least 3 characters long',
  passwordLengthError: 'password must be at least 6 characters long',
  nameLengthError: 'name must be at least 2 characters long',
  titleLengthError: 'Title must be between 2 and 256 characters long',
  defaultError: 'something went wrong',
};

export default errorMessages;
