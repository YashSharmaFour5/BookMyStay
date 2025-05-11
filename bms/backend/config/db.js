import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // How long to wait for operations to complete
            connectTimeoutMS: 30000, // How long to wait for initial connection
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 5, // Minimum number of connections in the pool
            retryWrites: true,
            retryReads: true
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        // Retry connection after 5 seconds
        setTimeout(connectDb, 5000);
    }
}

export default connectDb;