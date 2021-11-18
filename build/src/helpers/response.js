"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = exports.responseJson = void 0;
const responseJson = (responseObject) => {
    return responseObject;
};
exports.responseJson = responseJson;
const internalServerError = (errorObject) => {
    const response = {
        success: false,
        message: errorObject.message,
        data: {},
    };
    return response;
};
exports.internalServerError = internalServerError;
//# sourceMappingURL=response.js.map