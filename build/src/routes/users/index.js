"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const auth_1 = require("./auth");
const general_1 = require("./general");
const userRoute = (0, express_1.Router)();
userRoute.post('/login', auth_1.loginHandler);
userRoute.post('/signup', auth_1.signupHandler);
userRoute.post('/emailCheck', general_1.emailCheckHandler);
userRoute.post('/password/forgot', auth_1.forgotPasswordHandler);
userRoute.post('/password/forgot/verifyotp', auth_1.verifyForgotOtpHandler);
userRoute.post('/password/forgot/reset', auth_1.resetPasswordHandler);
userRoute.use(middleware_1.userAuth);
userRoute.put('/password', auth_1.changePasswordHandler);
exports.default = userRoute;
//# sourceMappingURL=index.js.map