"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
require("dotenv/config");
const uri = `mongodb+srv://IanMatheus:${process.env.DB_PASS}@cluster.txdhlro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;
const client = new mongodb_1.MongoClient(uri, {
    tls: true,
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function conectar() {
    await client.connect();
}
conectar();
console.log("Make a connection with the database.");
exports.default = client;
