"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    details: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const AuditModel = (0, mongoose_1.model)('Audit', schema);
exports.default = AuditModel;
//# sourceMappingURL=audit.js.map