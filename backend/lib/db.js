import mongoose from "mongoose";


async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch(error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}


export default connectDB;