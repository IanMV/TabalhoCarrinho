"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.post("/remove-cart", async (req, res) => {
    const { user, id } = req.body;
    try {
        const usuario = await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .findOne({ email: user.email });
        const cart = usuario.cart;
        const index = cart.indexOf(id);
        cart.splice(index, 1);
        await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .updateOne({ email: user.email }, { $set: { cart: cart } });
        res.sendStatus(200);
    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500);
    }
});
exports.default = router;
