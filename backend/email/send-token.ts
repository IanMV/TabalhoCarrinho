import express from "express";
import db from "../db";
import nodemailer from "nodemailer";
import "dotenv/config";

import { Code } from "./CodeConstructor";
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-token", async (req, res) => {
  const { email } = req.body;

  const random: number = Math.floor(Math.random() * 1000000);
  const token = new Code(email, random);

  try {
    const isRegistered = await db
      .db("Sistema")
      .collection("usuarios")
      .findOne({ email: email });

    if (!isRegistered) {
      try {
        const isSended = await db
          .db("Sistema")
          .collection("tokens")
          .findOne({ email: email });
        if (!isSended) {
          try {
            await db.db("Sistema").collection("tokens").insertOne(token);
            try {
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Email verification.",
                text: `Your verification email code is: ${random}`,
              };

              await transporter.sendMail(mailOptions);
              res.sendStatus(200);
            } catch (erro) {
              res.sendStatus(503);
            }
          } catch (error) {
            res.sendStatus(500);
          }
        } else {
          res.sendStatus(409);
        }
      } catch (error) {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(418);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
