import express from "express";
import cors from "cors";
import "dotenv/config"
import UserLogin from "./user/user-login";
import UserRegister from "./user/user-register";
import ResendToken from "./email/resend-token";
import SendToken from "./email/send-token";
import EmailVerification from "./email/email-verification";
import GetCart from "./cart/get-cart";
import AddCart from "./cart/add-cart"
import RemoveCart from "./cart/remove-cart";

const app = express();


app.use(cors({
  origin: '*',
  credentials: true,
}));
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
