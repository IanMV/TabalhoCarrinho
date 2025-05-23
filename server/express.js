"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const user_login_1 = __importDefault(require("./user/user-login"));
const user_register_1 = __importDefault(require("./user/user-register"));
const resend_token_1 = __importDefault(require("./email/resend-token"));
const send_token_1 = __importDefault(require("./email/send-token"));
const email_verification_1 = __importDefault(require("./email/email-verification"));
const get_cart_1 = __importDefault(require("./cart/get-cart"));
const add_cart_1 = __importDefault(require("./cart/add-cart"));
const remove_cart_1 = __importDefault(require("./cart/remove-cart"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/user", user_register_1.default);
app.use("/user", user_login_1.default);
app.use("/user", email_verification_1.default);
app.use("/email", send_token_1.default);
app.use("/email", resend_token_1.default);
app.use("/cart", get_cart_1.default);
app.use("/cart", add_cart_1.default);
app.use("/cart", remove_cart_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
