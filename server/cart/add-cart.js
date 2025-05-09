"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.post("/add-cart", async (req, res) => {
    const { user, id } = req.body;
    const cart = {
        cart: id.toString()
    };
    try {
        await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .updateOne({ email: user.email }, { $push: cart });
        res.sendStatus(200);
    }
    catch (erro) { // Declare explicitamente o tipo de 'erro' como 'any' ou 'Error'
        console.error(erro);
        res.sendStatus(500);
    }
});
exports.default = router;
