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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.getOTPJwt = exports.getRefreshJwt = exports.getJwt = void 0;
// import { get } from 'config';
const jsonwebtoken_1 = require("jsonwebtoken");
let jwtConfig = { secret: 'gvoodevmxzxyulp' };
console.log(jwtConfig);
const jwtOption = {
    // expiresIn: jwtConfig.expiresIn || '1m',
    expiresIn: '1y',
};
const refreshJwtOption = {
    // expiresIn: jwtConfig.refreshExpiresIn || '1y',
    expiresIn: '1y',
};
function getJwt(data) {
    return (0, jsonwebtoken_1.sign)(data, jwtConfig.secret, jwtOption);
}
exports.getJwt = getJwt;
function getRefreshJwt(data) {
    return (0, jsonwebtoken_1.sign)(data, jwtConfig.secret, refreshJwtOption);
}
exports.getRefreshJwt = getRefreshJwt;
function getOTPJwt(data) {
    return (0, jsonwebtoken_1.sign)(data, jwtConfig.secret, jwtOption);
}
exports.getOTPJwt = getOTPJwt;
function verifyJwt(authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield (0, jsonwebtoken_1.verify)(authorization, jwtConfig.secret);
        return token;
    });
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.helper.js.map