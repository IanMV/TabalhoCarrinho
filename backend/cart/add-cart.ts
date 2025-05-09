import express from "express";
import db from "../db";
const router = express.Router();


router.post("/add-cart", async (req, res) => {
  const { user , id } = req.body;
const cart: any = {
  cart: id.toString()
}

  try {
    await db
      .db("Sistema")
      .collection("usuarios")
      .updateOne({ email: user.email }, { $push: cart });

    res.sendStatus(200);
  } catch (erro: any) { // Declare explicitamente o tipo de 'erro' como 'any' ou 'Error'
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;