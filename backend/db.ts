import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const uri = `mongodb+srv://IanMatheus:${process.env.DB_PASS}@cluster.txdhlro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const client = new MongoClient(uri, {
  tls: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();

console.log("Make a connection with the database.");

export default client;
