"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotOtpHandler = void 0;
const joi_1 = require("joi");
const users_1 = __importDefault(require("../../../database/model/users"));
const helpers_1 = require("../../../helpers");
const user_1 = require("../../../helpers/validation/user");
const logger_1 = __importDefault(require("../../../logger"));
const verifyForgotOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.userForgotVerifyOtpSchema.validateAsync(req.body);
        const { email, otp } = req.body;
        let userData = yield users_1.default.findOne({
            email: email
        });
        if (!userData) {
            logger_1.default.debug(`superAdmin is not valid.`);
            return res.status(400).json({
                error: 'User not found with given email.',
            });
        }
        if (otp != userData.otp) {
            logger_1.default.debug(`OTP is not valid.`);
            return res.status(400).json({
                error: 'Otp is not valid.',
            });
        }
        const jwt = (0, helpers_1.getJwt)({
            email: userData.email,
            fname: userData.fname,
            lname: userData.lname,
            _id: userData._id,
        });
        userData.forgot_pass_token = jwt;
        yield userData.save();
        res.json({
            token: jwt,
            message: "Token send."
        });
    }
    catch (error) {
        if (error instanceof joi_1.ValidationError) {
            return res.status(400).json({
                error: error.message,
            });
        }
        console.log(error);
        res.sendStatus(500);
    }
});
exports.verifyForgotOtpHandler = verifyForgotOtpHandler;
//# sourceMappingURL=verify-forgot-password-otp.js.map