import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(`Mongodb connection: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: " + error);
    process.exit(1);
  }
};

export default connectDB;
