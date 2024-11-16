import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to MongoDB.");
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default dbConnection;
