import { Request, Response } from 'express';

import { models } from '../config/Database';
import {
  downloadFile,
  escapeRegex,
  getQueryOptions,
  isValidId,
  paginate,
  sendJSONResponse,
  slugify,
} from '../utils/helpers';
import logger from '../config/logger';
import errorMessages from '../utils/errorMessages';

const { Article } = models;

type ArticleQuery = {
  createdBy: string;
  title?: RegExp;
};

class AuthController {
  static async getUserArticles(req: Request, res: Response) {
    const currentUser = req.user!;
    logger.info('attempting to get articles for user');
    const { limit, page } = getQueryOptions(req);

    let query: ArticleQuery = { createdBy: currentUser.userId };
    const offset = (page - 1) * limit;

    if (req.query.q) {
      const searchQuery = escapeRegex(req.query.q.toString());
      logger.info(`Getting articles with query (${searchQuery})`);
      query = { ...query, title: new RegExp(searchQuery, 'gi') };
    }

    const articlesPromise = Article.find(query).sort({ createdAt: 1 }).skip(offset).limit(limit);
    const countPromise = Article.countDocuments(query);
    const [articles, count] = await Promise.all([articlesPromise, countPromise]);
    logger.info('articles fetched successfully');
    const metaData = paginate(count, limit, offset);
    return sendJSONResponse(res, 200, { articles, metaData }, 'articles retrieved successfully');
  }

  static async createArticle(req: Request, res: Response) {
    const { title, content, documentUrl } = req.body;
    const currentUser = req.user!;
    logger.info(`attempting to create article with title ${title}`);

    let slug = slugify(title);

    // TODO: swtich to pub sub model to extract text and generate topics
    const parsedContentPromise = downloadFile(documentUrl);
    const exisitngArticlesPromise = Article.find({ slug: new RegExp(slug, 'gi') }).sort({ createdAt: -1 });
    const [exisitngArticles, parsedContent] = await Promise.all([exisitngArticlesPromise, parsedContentPromise]);

    if (exisitngArticles.length > 0) {
      slug = `${slug}-${exisitngArticles.length + 1}`;
    }

    const article = new Article({
      title,
      slug,
      content: parsedContent || content,
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
      'article created successfully',
    );
  }

  static async getArticle(req: Request, res: Response) {
    logger.info('attempting to get article');
    const { id: articleId } = req.params;

    let article;
    if (isValidId(articleId)) {
      article = await Article.findById(articleId);
    } else {
      article = await Article.findOne({ slug: articleId });
    }

    if (!article) {
      logger.warn(`Error getting article with Id ${articleId}. Article not found`);
      return sendJSONResponse(res, 404, {}, errorMessages.notFound);
    }

    return sendJSONResponse(res, 200, { article }, 'article retrieved successfully');
  }

  static async deleteArticle(req: Request, res: Response) {
    logger.info('attempting to delete article');
    const currentUser = req.user!;
    const { id: articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      logger.warn(`Error getting article with id (${articleId})`);
      return sendJSONResponse(res, 404, {}, 'article not found.');
    }
    await article.remove();

    logger.info(`article ${article.title} deleted by ${currentUser.email} successfully`);
    return sendJSONResponse(res, 204, {}, 'article deleted successfully');
  }
}

export default AuthController;
