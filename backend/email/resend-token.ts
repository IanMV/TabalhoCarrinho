import express from "express";
import db from "../db.ts";
import nodemailer from "nodemailer";
import "dotenv/config";

import { Code } from "./CodeConstructor.ts";
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/resend-token", async (req, res) => {
  const { email } = req.body;

  const random: number = Math.floor(Math.random() * 1000000);

  const token = new Code(email, random);
  
  try {
    await db
      .db("Sistema")
      .collection("tokens")
      .replaceOne({ email: email }, token, { upsert: true });
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email verification.",
        text: `Your verification email code is: ${random}`,
      };

      await transporter.sendMail(mailOptions);
      
      res.sendStatus(201);
    } catch (erro) {
      console.error(erro);
      res.sendStatus(503);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
