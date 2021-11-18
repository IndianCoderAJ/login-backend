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
exports.signupHandler = void 0;
const joi_1 = require("joi");
const users_1 = __importStar(require("../../../database/model/users"));
const user_1 = require("../../../helpers/validation/user");
const audit_1 = __importDefault(require("../../../database/model/audit"));
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.signupSchema.validateAsync(req.body);
        // password hashing.
        const newUser = new users_1.default({
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname,
        });
        newUser.salt = (0, users_1.generateSalt)();
        newUser.password = (0, users_1.encryptPassword)(req.body.password, newUser.salt);
        let userData = yield newUser.save();
        let audit = new audit_1.default({
            user: userData._id,
            details: `User register for ${userData.email}`,
        });
        yield audit.save();
        res.json({
            message: "Register successfully.",
            status: true
        });
    }
    catch (error) {
        if (error instanceof joi_1.ValidationError) {
            return res.status(400).json({
                error: error.message,
            });
        }
        console.log(error.code);
        if ((error.name === 'MongoError' || error.name === 'MongoServerError') && error.code === 11000) {
            return res.status(400).json({
                error: "Email id is already available in the system.",
            });
        }
        res.sendStatus(500);
    }
});
exports.signupHandler = signupHandler;
//# sourceMappingURL=signup.js.map