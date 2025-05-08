import express from "express";
import db from "../db.ts";

const router = express.Router();

router.post("/get-cart", async (req, res) => {
  const { user } = req.body;

  try {
    const result: any = await db
      .db("Sistema")
      .collection("usuarios")
      .findOne({ email: user.email });

    res.status(200).json({cart: result.cart});
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;
