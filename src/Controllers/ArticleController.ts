import { Request, Response } from 'express';

import { models } from '../config/Database';
import { sendJSONResponse, slugify } from '../utils/helpers';
import logger from '../config/logger';

const { Article } = models;

class AuthController {
  static async createArticle(req: Request, res: Response): Promise<Response<any>> {
    const { title, content, documentUrl } = req.body;
    const currentUser = req.user!;
    logger.info(`attempting to create article with title ${title}`);

    const slug = slugify(title);
    const article = new Article({
      title,
      slug,
      content,
      documentUrl,
      createdBy: currentUser.userId,
    });

    const createdArticle = await article.save();

    logger.info(`Article ${title} created successfully`);

    return sendJSONResponse(
      res,
      201,
      {
        article: createdArticle,
      },
      'artcile created successfully',
    );
  }
}

export default AuthController;
