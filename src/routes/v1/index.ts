import express from 'express';

import authenticationRoutes from './authentication.route';

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('API Active'));

/**
 * GET v1/auth
 */

router.use('/auth', authenticationRoutes);

export default router;
