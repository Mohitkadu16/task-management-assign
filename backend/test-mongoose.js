const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || "mongodb+srv://loyalmanuka13_db_user:bE4FAmp6wzjAuoG4@cluster0.zlbbpok.mongodb.net/task-tracker?appName=Cluster0";

const Task = require('./models/Task');

async function run() {
  try {
    console.log("Connecting mongoose...");
    await mongoose.connect(uri);
    console.log("Connected.");
    const task = new Task({ title: "Test task via mongoose" });
    await task.save();
    console.log("Saved task!");
  } catch(e) {
    console.error("Mongoose Error:", e);
  } finally {
    await mongoose.disconnect();
  }
}
run();
