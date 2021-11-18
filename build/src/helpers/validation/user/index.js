"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCheckSchema = exports.userForgotResetOtpSchema = exports.userForgotVerifyOtpSchema = exports.userForgotPasswordSchema = exports.signupSchema = exports.userChangePasswordSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.userChangePasswordSchema = joi_1.default.object().keys({
    currPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
});
exports.signupSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    fname: joi_1.default.string().required(),
    lname: joi_1.default.string().required(),
});
exports.userForgotPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
});
exports.userForgotVerifyOtpSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    otp: joi_1.default.number().required(),
});
exports.userForgotResetOtpSchema = joi_1.default.object().keys({
    token: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.emailCheckSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required()
});
//# sourceMappingURL=index.js.map