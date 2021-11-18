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
exports.forgotPasswordHandler = void 0;
const joi_1 = require("joi");
const audit_1 = __importDefault(require("../../../database/model/audit"));
const users_1 = __importDefault(require("../../../database/model/users"));
const helpers_1 = require("../../../helpers");
const user_1 = require("../../../helpers/validation/user");
const logger_1 = __importDefault(require("../../../logger"));
const forgotPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.userForgotPasswordSchema.validateAsync(req.body);
        const { email } = req.body;
        let userData = yield users_1.default.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({
                error: 'Provided email is not registerd with any of the user.',
            });
        }
        let otp = undefined;
        otp = (0, helpers_1.generateOTP)();
        logger_1.default.info(`new otp created${otp.toString()}`);
        let audit = new audit_1.default({
            user: userData._id,
            details: `OTP  is generated for ${userData.email}`,
        });
        yield audit.save();
        userData.otp = otp.toString();
        yield userData.save();
        res.json({
            message: 'Email sent to registerd email, otp should be used within 5 minutes.',
            OTP: otp.toString()
        });
    }
    catch (error) {
        if (error instanceof joi_1.ValidationError) {
            return res.status(400).json({
                error: error.message,
            });
        }
        res.sendStatus(500);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
//# sourceMappingURL=forgot-password.js.map