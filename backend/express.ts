import express from "express";
import cors from "cors";
import "dotenv/config"
import UserLogin from "./user/user-login.ts";
import UserRegister from "./user/user-register.ts";
import ResendToken from "./email/resend-token.ts";
import SendToken from "./email/send-token.ts";
import EmailVerification from "./email/email-verification.ts";
import GetCart from "./cart/get-cart.ts";
import AddCart from "./cart/add-cart.ts"
import RemoveCart from "./cart/remove-cart.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", UserRegister);
app.use("/user", UserLogin)
app.use("/user", EmailVerification)
app.use("/email", SendToken)
app.use("/email", ResendToken)
app.use("/cart", GetCart)
app.use("/cart", AddCart)
app.use("/cart", RemoveCart)

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
