import { Router } from 'express';
import {  userAuth } from '../../middleware';
import {
	loginHandler,
    signupHandler,
	changePasswordHandler,
	forgotPasswordHandler,
	verifyForgotOtpHandler,
	resetPasswordHandler,
} from './auth';

import { emailCheckHandler } from './general';

const userRoute = Router();
userRoute.post('/login', loginHandler);
userRoute.post('/signup', signupHandler);
userRoute.post('/emailCheck',emailCheckHandler)
userRoute.post('/password/forgot', forgotPasswordHandler);
userRoute.post('/password/forgot/verifyotp', verifyForgotOtpHandler);
userRoute.post('/password/forgot/reset', resetPasswordHandler);
userRoute.use(userAuth);
userRoute.put('/password', changePasswordHandler);

export default userRoute;