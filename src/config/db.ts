import mongoose from "mongoose";

async function connectDB(dbUrl: string) {
  await mongoose.connect(dbUrl);
  console.log("MongoDB connected successfully.");
}

export default connectDB;
