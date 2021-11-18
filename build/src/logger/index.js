"use strict";
/**
 *
 *
 * different levels: error, warn, info, verbose, debug, silly
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
//  import { get } from 'config';
const winston = __importStar(require("winston"));
const { combine, label, timestamp, printf } = winston.format;
const appName = 'simple-login-backend';
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const options = {
    level: 'debug',
    format: combine(label({ label: appName }), timestamp(), myFormat),
    transports: [new winston.transports.Console()],
};
const logger = winston.createLogger(options);
exports.default = logger;
//# sourceMappingURL=index.js.map