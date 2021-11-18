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
/**
 *
 * @description Server and REST API config
 */
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const response_1 = require("./helpers/response");
const logger_1 = __importDefault(require("./logger"));
const index_1 = __importDefault(require("./database/index"));
const users_1 = __importDefault(require("./routes/users"));
const swaggerDocument = __importStar(require("./swagger.json"));
const app = (0, express_1.default)();
let server = new http_1.default.Server(app);
/**
 * DB connection.
 */
(0, index_1.default)();
/**
 * Handle connection to socket.io.
 */
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    try {
        const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        const ip = xForwardedFor || req.connection.remoteAddress;
        logger_1.default.info(`IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(req.query)}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${req.headers['user-agent']}`);
    }
    catch (error) {
        logger_1.default.error(`error while printing caller info path: ${req.path}`);
    }
    next();
});
const health = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'working', env: process.env.NODE_ENV, headers: req.headers });
});
app.get('/', health);
app.get('/health', health);
app.use('/user', users_1.default);
app.use((error, req, res, next) => {
    res.json(500).json((0, response_1.internalServerError)({
        message: error.message,
    }));
});
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = server;
//# sourceMappingURL=index.js.map