import express from "express";
import db from "../db.ts";
import bcrypt from "bcrypt";

const router = express.Router();

interface Body {
  email: string;
  password: string;
}

router.post("/login", async (req, res) => {
  const { email, password }: Body = req.body;

  try {
    const information: any = await db
      .db("Sistema")
      .collection("usuarios")
      .findOne({ email: email });

    if (!information) {
      res.sendStatus(404);
    }

    const isCorrect: boolean = bcrypt.compareSync(
      password,
      information.password
    );

    if (isCorrect) {
      res.status(200).json({
        information: information,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;
