"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post("/check-token", async (req, res) => {
    const { email, code } = req.body;
    try {
        const token = await db_1.default
            .db("Sistema")
            .collection("tokens")
            .findOne({ email: email });
        console.log(token);
        const isCode = bcrypt_1.default.compareSync(code.toString(), token.code);
        if (isCode) {
            await db_1.default.db("Sistema").collection("tokens").deleteOne({ email: email });
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.default = router;
