import express from 'express';

import ArticleController from '../../Controllers/ArticleController';
import { catchErrors } from '../../utils/helpers';
import { authenticate } from '../../middlewares/authentication';
import { createArticleValidator } from '../../policies/article';

const router = express.Router();

router.post('/', authenticate, createArticleValidator, catchErrors(ArticleController.createArticle));

export default router;
