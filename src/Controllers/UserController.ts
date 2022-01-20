import { Request, Response } from 'express';

import { models } from '../config/Database';
import { sendJSONResponse } from '../utils/helpers';
import logger from '../config/logger';
import errorMessages from '../utils/errorMessages';

const { User } = models;

class UserController {
  static async getUserProfile(req: Request, res: Response): Promise<Response<any>> {
    const currentUser = req.user!;
    logger.info(`Fetching profile. for user (${currentUser.userId})`);

    const user = await User.findById(currentUser.userId, 'email firstName lastName imageUrl createdAt updatedAt');

    if (!user) {
      logger.warn(`Error getting profile account for user (${currentUser.userId})`);
      return sendJSONResponse(res, 404, {}, errorMessages.notFound);
    }

    logger.info(`user (${currentUser.userId}- ${currentUser.email}) account fetched successfully`);
    return sendJSONResponse(res, 200, { user }, 'User retrieved successfully');
  }
}

export default UserController;
