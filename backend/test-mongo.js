const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI || "mongodb+srv://loyalmanuka13_db_user:bE4FAmp6wzjAuoG4@cluster0.zlbbpok.mongodb.net/task-tracker?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("task-tracker");
    const collection = db.collection('tasks');
    await collection.insertOne({ title: "test" });
    console.log("Inserted test document!");
  } catch (err) {
    console.error("ERROR OCCURRED:", err);
  } finally {
    await client.close();
  }
}
run();
