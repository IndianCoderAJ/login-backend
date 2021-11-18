"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisExpirationTime = exports.maxOtp = exports.otpAge = exports.generateOTP = void 0;
__exportStar(require("./jwt.helper"), exports);
const dotenv = require('dotenv');
dotenv.config();
const generateOTP = function (otpLength = 6) {
    let baseNumber = Math.pow(10, otpLength - 1);
    let number = Math.floor(Math.random() * baseNumber);
    if (number < baseNumber) {
        number += baseNumber;
    }
    return number;
};
exports.generateOTP = generateOTP;
exports.otpAge = parseInt(process.env.OTP_AGE, 10) || 3;
exports.maxOtp = parseInt(process.env.MAX_OTP, 10) || 10;
exports.redisExpirationTime = parseInt(process.env.REDIS_EXP_TIME, 10) || 600;
//# sourceMappingURL=index.js.map