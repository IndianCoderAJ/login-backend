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
exports.emailCheckHandler = void 0;
const joi_1 = require("joi");
const users_1 = __importDefault(require("../../../database/model/users"));
const user_1 = require("../../../helpers/validation/user");
const emailCheckHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.emailCheckSchema.validateAsync(req.body);
        const { email } = req.body;
        let userData = yield users_1.default.findOne({ email: email });
        if (!userData) {
            return res.status(200).json({
                emailTaken: false,
            });
        }
        return res.status(200).json({
            emailTaken: true,
        });
    }
    catch (error) {
        if (error instanceof joi_1.ValidationError) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
});
exports.emailCheckHandler = emailCheckHandler;
//# sourceMappingURL=email.js.map