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
exports.loginHandler = void 0;
const joi_1 = require("joi");
const user_1 = require("../../../helpers/validation/user");
const users_1 = __importStar(require("../../../database/model/users"));
const audit_1 = __importDefault(require("../../../database/model/audit"));
const logger_1 = __importDefault(require("../../../logger"));
const helpers_1 = require("../../../helpers");
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Asfsafsafasfs---------------");
        yield user_1.userLoginSchema.validateAsync(req.body);
        const { email, password } = req.body;
        const userData = yield users_1.default.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({
                error: 'The given email-id is not associated with any account.',
            });
        }
        logger_1.default.debug(`user Found for: ${email}`);
        const passwordMatched = (0, users_1.verifyPassword)(password, userData.salt, userData.password);
        if (!passwordMatched) {
            let audit = new audit_1.default({
                user: userData._id,
                details: 'Password was not correct',
            });
            yield audit.save();
            return res.status(400).json({
                error: 'Password is not valid.',
            });
        }
        let audit = new audit_1.default({
            user: userData._id,
            details: 'Password was not correct',
        });
        yield audit.save();
        logger_1.default.debug(`creating jwt....`);
        const jwt = (0, helpers_1.getJwt)({
            email: userData.email,
            fname: userData.fname,
            lname: userData.lname,
            _id: userData._id,
        });
        logger_1.default.debug(`responding to request....`);
        res.json({
            accessToken: jwt,
            data: {
                email: userData.email,
                fname: userData.fname,
                lname: userData.lname,
                _id: userData._id,
            }
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
exports.loginHandler = loginHandler;
//# sourceMappingURL=login.js.map