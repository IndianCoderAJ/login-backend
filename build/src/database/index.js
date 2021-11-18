"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let dbConnection = () => {
    let MongoConnectionURL = ' ';
    console.log(MongoConnectionURL, process.env.NODE_ENV_SET);
    if (process.env.NODE_ENV_SET === `production` ? MongoConnectionURL = process.env.DB_LIVE_URL : MongoConnectionURL = process.env.DB_LOCAL_URL)
        mongoose_1.default
            .connect(MongoConnectionURL)
            .then((res) => {
            console.log("Mongodb connected..");
        })
            .catch(err => {
            console.log(err);
            process.exit(1);
        });
};
exports.default = dbConnection;
//# sourceMappingURL=index.js.map