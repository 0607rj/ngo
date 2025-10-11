// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    })

    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(` Error: ${error.message}`);
  
  }
};

export default connectDB;
