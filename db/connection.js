import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URL || "mongodb://root:n5BzYPmb8tuihtBG3x594ZChDr72TWYZHZqQrtmoRinZspsWBEOh2437FFA1YR14@51.79.175.191:27017/?directConnection=true");
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully connected to MongoDB.");
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default dbConnection;
