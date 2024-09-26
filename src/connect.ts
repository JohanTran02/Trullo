import mongoose from "mongoose";
import "dotenv/config";

const db = mongoose.connection;

async function connectToDB() {
    const DB_URL = process.env.DB_URL;
    try {
        await mongoose.connect(String(DB_URL), {})
    }
    catch (error) {
        console.log(error);
    }
}

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to MongoDB"))

export { connectToDB };