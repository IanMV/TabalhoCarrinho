"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const UserConstructor_1 = require("./UserConstructor");
const router = express_1.default.Router();
router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = new UserConstructor_1.User(name, email, password);
        await db_1.default
            .db("Sistema")
            .collection("usuarios")
            .insertOne(user);
        res.sendStatus(201);
    }
    catch (erro) {
        console.error(erro);
        res.sendStatus(500);
    }
});
exports.default = router;
