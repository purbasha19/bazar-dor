const dns = require("node:dns");
const { MongoClient } = require("mongodb");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

process.loadEnvFile(".env.local");

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI, {
  autoSelectFamily: false,
});

  try {
    await client.connect();
    console.log("MongoDB connected successfully!");

    const db = client.db("bazar-dor");
    console.log(await db.command({ ping: 1 }));
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  } finally {
    await client.close();
  }
}

testConnection();