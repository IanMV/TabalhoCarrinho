"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const information = await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .findOne({ email: email });
        if (!information) {
            res.sendStatus(404);
        }
        const isCorrect = bcrypt_1.default.compareSync(password, information.password);
        if (isCorrect) {
            res.status(200).json({
                information: information,
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500);
    }
});
exports.default = router;
