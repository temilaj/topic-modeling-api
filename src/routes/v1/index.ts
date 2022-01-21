import express from 'express';

import authenticationRoutes from './authentication.route';
import articlesRoutes from './articles.route';
import usersRoutes from './user.route';
import uploadRoutes from './upload.route';

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('API Active'));

/**
 * GET v1/auth
 */

router.use('/auth', authenticationRoutes);
router.use('/articles', articlesRoutes);
router.use('/users', usersRoutes);
router.use('/upload', uploadRoutes);

export default router;
