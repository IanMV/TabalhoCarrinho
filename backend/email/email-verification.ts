import express from "express";
import db from "../db";
import bcrypt from "bcrypt";

const router = express.Router();



router.post("/check-token", async (req, res) => {
  const { email, code } = req.body;

  try {
    const token: any = await db
      .db("Sistema")
      .collection("tokens")
      .findOne({ email: email });

      console.log(token)

      

    const isCode = bcrypt.compareSync(code.toString(), token.code);

    if (isCode) {
      await db.db("Sistema").collection("tokens").deleteOne({ email: email });

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

export default router