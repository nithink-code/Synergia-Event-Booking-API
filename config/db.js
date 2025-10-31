import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let isConnected = false;

const connectDB = async () => {
    // If already connected, return immediately
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL is not defined in environment variables");
            throw new Error("MONGODB_URL is not defined");
        }
        
        // Configure mongoose for serverless environment
        mongoose.set('bufferCommands', false);
        mongoose.set('bufferTimeoutMS', 30000);
        
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        
        isConnected = true;
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        isConnected = false;
        throw error;
    }
};

export default connectDB;
