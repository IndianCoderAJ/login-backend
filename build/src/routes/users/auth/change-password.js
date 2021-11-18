"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.changePasswordHandler = void 0;
const joi_1 = require("joi");
const user_1 = require("../../../helpers/validation/user");
const users_1 = __importStar(require("../../../database/model/users"));
const logger_1 = __importDefault(require("../../../logger"));
const users_2 = require("../../../database/model/users");
const audit_1 = __importDefault(require("../../../database/model/audit"));
const changePasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.userChangePasswordSchema.validateAsync(req.body);
        const { email } = req.headers.tokenData;
        const { currPassword, newPassword } = req.body;
        if (currPassword == newPassword) {
            return res.status(400).json({
                error: 'Current password and new password are same.',
            });
        }
        let userData = yield users_1.default.findOne({
            email: email
        });
        const passwordMatched = (0, users_2.verifyPassword)(currPassword, userData.salt, userData.password);
        if (!passwordMatched) {
            logger_1.default.debug(`current password not matched.`);
            return res.status(400).json({
                error: 'Current password is not valid.',
            });
        }
        logger_1.default.debug(`current password matched, upadating new password.....`);
        userData.password = (0, users_1.encryptPassword)(newPassword, userData.salt);
        userData.save();
        // await UserModel.findOneAndUpdate({ email:email as string},{ password:newPassword});
        let audit = new audit_1.default({
            user: userData._id,
            details: `Password is updated for ${userData.email}`,
        });
        yield audit.save();
        res.json({
            message: 'Password changed successfully.',
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
exports.changePasswordHandler = changePasswordHandler;
//# sourceMappingURL=change-password.js.map