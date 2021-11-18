"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.userChangePasswordSchema = joi_1.default.object().keys({
    currPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
});
//# sourceMappingURL=index.js.map