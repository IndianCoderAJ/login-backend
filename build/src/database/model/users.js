"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
const mongoose_1 = require("mongoose");
const index_1 = __importDefault(require("../../logger/index"));
const crypto_1 = __importDefault(require("crypto"));
const schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String },
    token: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const UserModel = (0, mongoose_1.model)('User', schema);
const encryptPassword = (plainText, salt) => {
    return crypto_1.default
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
};
const verifyPassword = (enteredPassword, salt, exsitingPassword) => {
    index_1.default.info('encrypted pwd');
    index_1.default.info(encryptPassword(enteredPassword, salt));
    return encryptPassword(enteredPassword, salt) === exsitingPassword;
};
exports.verifyPassword = verifyPassword;
exports.default = UserModel;
// export const setSaltAndPassword = async (superAdmin: SuperAdmin) => {
//   if (superAdmin.changed('password')) {
//       superAdmin.salt = generateSalt();
//       superAdmin.password = encryptPassword(superAdmin.password, superAdmin.salt);
//   }
// };
//# sourceMappingURL=users.js.map