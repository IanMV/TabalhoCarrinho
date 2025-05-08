import express from "express";
import db from "../db.ts";

const router = express.Router();

router.post("/add-cart", async (req, res) => {
  const { user, id } = req.body;

  try {
    await db
      .db("Sistema")
      .collection("usuarios")
      .updateOne({ email: user.email }, { $push: { cart: id } });

    res.sendStatus(200);
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;
