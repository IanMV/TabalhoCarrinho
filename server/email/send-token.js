"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const CodeConstructor_1 = require("./CodeConstructor");
const router = express_1.default.Router();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
router.post("/send-token", async (req, res) => {
    const { email } = req.body;
    const random = Math.floor(Math.random() * 1000000);
    const token = new CodeConstructor_1.Code(email, random);
    try {
        const isRegistered = await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .findOne({ email: email });
        if (!isRegistered) {
            try {
                const isSended = await db_1.default
                    .db("Sistema")
                    .collection("tokens")
                    .findOne({ email: email });
                if (!isSended) {
                    try {
                        await db_1.default.db("Sistema").collection("tokens").insertOne(token);
                        try {
                            const mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: email,
                                subject: "Email verification.",
                                text: `Your verification email code is: ${random}`,
                            };
                            await transporter.sendMail(mailOptions);
                            res.sendStatus(200);
                        }
                        catch (erro) {
                            res.sendStatus(503);
                        }
                    }
                    catch (error) {
                        res.sendStatus(500);
                    }
                }
                else {
                    res.sendStatus(409);
                }
            }
            catch (error) {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(418);
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.default = router;
