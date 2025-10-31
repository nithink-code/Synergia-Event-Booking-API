import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL is not defined in environment variables");
            throw new Error("MONGODB_URL is not defined");
        }
        
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

export default connectDB;
