import express from 'express';

import UserController from '../../Controllers/UserController';
import { authenticate } from '../../middlewares/authentication';
import { catchErrors } from '../../utils/helpers';

const router = express.Router();

router.get('/me', authenticate, catchErrors(UserController.getUserProfile));

export default router;
