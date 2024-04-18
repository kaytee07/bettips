import mongoose from "mongoose";

export const connectToDB = async () => {
    let isConnected = false;
    mongoose.set('strictQuery', true);
    if(isConnected) {
        console.log('MongoDB is already running');
        return;
    }

    try {
        await mongoose.connect(process.env?.MONGOURI || "jknmslkmjnskks");
        isConnected = true;
        console.log(`MongoDB is connected`);
    } catch (error) {
        console.log(error)
    }
}