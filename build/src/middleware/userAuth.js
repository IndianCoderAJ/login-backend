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
exports.userAuth = void 0;
const helpers_1 = require("../helpers");
const logger_1 = __importDefault(require("../logger"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                message: 'Unauthorized access. Please provide valid token.',
            });
        }
        const tokenData = yield (0, helpers_1.verifyJwt)(authorization);
        req.headers.tokenData = tokenData;
        next();
    }
    catch (error) {
        logger_1.default.error('error while authenticateUser so sending 401');
        console.log(error);
        return res.status(401).json({
            message: 'Unauthorized access. token expired.',
        });
    }
});
exports.userAuth = userAuth;
//# sourceMappingURL=userAuth.js.map