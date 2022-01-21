import express from 'express';

import UploadController from '../../Controllers/UploadController';
import { authenticate } from '../../middlewares/authentication';
import { getSignedUrlValidator } from '../../policies/upload';
import { catchErrors } from '../../utils/helpers';

const router = express.Router();

router.post('/', authenticate, getSignedUrlValidator, catchErrors(UploadController.getSignedRequestUrl));

export default router;
