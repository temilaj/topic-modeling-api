import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { models } from '../config/Database';
import configuration from '../config/environments';
import errorMessages from '../utils/errorMessages';
import { sendJSONResponse, signRefreshToken, signToken } from '../utils/helpers';
import logger from '../config/logger';

const { User } = models;

class AuthController {
  static async signUp(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;
    logger.info(`attempting to create account for user with email ${email}`);
    const emailExists = await User.findOne({ email: email.toLowerCase() }, 'email');
    const duplicateErrors = { email: '' };
    if (emailExists) {
      duplicateErrors.email = errorMessages.duplicateEmail;
      logger.warn(`Error creating account for user ${email}. Email already exists`);
      return sendJSONResponse(res, 400, { errors: duplicateErrors }, 'error creating account');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      password: passwordHash,
      firstName,
      lastName,
    });

    const createdUser = await user.save();
    const authToken = signToken(createdUser);
    logger.info(`user ${email} ${user.firstName} created successfully`);

    return sendJSONResponse(
      res,
      201,
      {
        user: {
          id: createdUser.id,
          email: createdUser.email,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          imageUrl: createdUser.imageUrl,
          createdAt: createdUser.createdAt,
        },
        authToken,
      },
      'account created successfully',
    );
  }

  static async logIn(req: Request, res: Response): Promise<Response<any>> {
    const { email, password } = req.body;
    logger.info(`attempting to log in user ${email}`);
    const user = await User.findOne(
      { email: email.toLowerCase() },
      'email password firstName lastName imageUrl refreshTokenVersion',
    );
    if (!user) {
      return sendJSONResponse(res, 401, {}, errorMessages.invalidCredentials);
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      logger.warn(`Invalid sign in attempt for user ${email}`);
      return sendJSONResponse(res, 401, {}, errorMessages.invalidCredentials);
    }

    logger.info(`user ${email} sign in successful`);

    let authToken;
    if (req.headers?.origin === configuration.appURL) {
      const refreshToken = signRefreshToken(user);
      authToken = signToken(user, '7d');
      res.cookie('refreshToken', refreshToken, configuration.cookie.options);
    } else {
      authToken = signToken(user);
    }

    return sendJSONResponse(
      res,
      200,
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          createdAt: user.createdAt,
        },
        authToken,
      },
      'Sign in successful',
    );
  }
}

export default AuthController;
