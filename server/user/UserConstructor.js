"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    name;
    email;
    password;
    favorites;
    cart;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = this.passwordhash(password);
        this.favorites = [];
        this.cart = [];
    }
    passwordhash(pass) {
        return bcrypt_1.default.hashSync(pass, 13);
    }
}
exports.User = User;
