import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { models } from '../config/Database';
import { sendJSONResponse, signToken } from '../utils/helpers';

import logger from '../config/logger';
import errorMessages from '../utils/errorMessages';

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
}

export default AuthController;
