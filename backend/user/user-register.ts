import express from "express";
import db from "../db";
import { User } from "./UserConstructor";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = new User(name, email, password);
    await db
      .db("Sistema")
      .collection("usuarios")
      .insertOne(user);
    res.sendStatus(201);
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;
