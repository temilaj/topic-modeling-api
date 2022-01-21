import express from 'express';

import ArticleController from '../../Controllers/ArticleController';
import { catchErrors } from '../../utils/helpers';
import { authenticate } from '../../middlewares/authentication';
import { createArticleValidator } from '../../policies/article';

const router = express.Router();

router.post('/', authenticate, createArticleValidator, catchErrors(ArticleController.createArticle));
router.get('/me', authenticate, catchErrors(ArticleController.getUserArticles));
router.get('/:id', authenticate, catchErrors(ArticleController.getArticle));
router.delete('/:id', authenticate, catchErrors(ArticleController.deleteArticle));

export default router;
