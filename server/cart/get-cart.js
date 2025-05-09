"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.post("/get-cart", async (req, res) => {
    const { user } = req.body;
    try {
        const result = await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .findOne({ email: user.email });
        res.status(200).json({ cart: result.cart });
    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500);
    }
});
exports.default = router;
