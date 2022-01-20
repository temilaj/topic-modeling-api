import express from 'express';

import AuthController from '../../Controllers/AuthController';
import { catchErrors } from '../../utils/helpers';
import { loginValidator, signUpValidator } from '../../policies/auth';

const router = express.Router();

router.post('/login', loginValidator, catchErrors(AuthController.logIn));

router.post('/signup', signUpValidator, catchErrors(AuthController.signUp));

router.post('/logout', catchErrors(AuthController.logOut));

router.post('/refresh-token', catchErrors(AuthController.refreshToken));

export default router;
