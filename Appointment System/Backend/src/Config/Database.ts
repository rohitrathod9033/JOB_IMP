import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL || "");
    console.log("Database connected");
  } catch (error: any) {
    console.log(error.message);
  }
};

connectDB();

export default connectDB;
