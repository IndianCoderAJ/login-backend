"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {  userAuth } from '../../middleware';
const auth_1 = require("./auth");
const userRoute = (0, express_1.Router)();
userRoute.post('/login', auth_1.loginHandler);
// userRoute.post('/signup', createHandler);
// userRoute.post('/password/forgot', forgotPasswordHandler);
// userRoute.post('/password/forgot/verifyotp', verifyForgotOtpHandler);
// userRoute.post('/password/forgot/reset', resetPasswordHandler);
// userRoute.use(userAuth);
// userRoute.put('/password', changePasswordHandler);
exports.default = userRoute;
//# sourceMappingURL=index.js.map