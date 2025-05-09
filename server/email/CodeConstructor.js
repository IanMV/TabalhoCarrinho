"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Code {
    email;
    code;
    createAt;
    constructor(email, code) {
        this.email = email;
        this.code = this.codehash(code);
        this.createAt = new Date();
    }
    codehash(number) {
        const code = number.toString();
        return bcrypt_1.default.hashSync(code, 12);
    }
}
exports.Code = Code;
