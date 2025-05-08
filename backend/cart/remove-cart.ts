import express from "express";
import db from "../db.ts";

const router = express.Router();

router.post("/remove-cart", async (req, res) => {
  const { user, id } = req.body;

  try {
    const usuario: any = await db
      .db("Sistema")
      .collection("usuarios")
      .findOne({ email: user.email });

    const cart = usuario.cart;

    const index = cart.indexOf(id);

    cart.splice(index, 1);

    await db
      .db("Sistema")
      .collection("usuarios")
      .updateOne({ email: user.email }, { $set: { cart: cart } });

    res.sendStatus(200);
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500);
  }
});

export default router;
