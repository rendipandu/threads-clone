import mongoose from "mongoose";

let isConnected = false; //Variable to chech if mongoose is connected

// MongoDB Password: fP1TSKAGkA7xT5I2

export const connectedToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if (isConnected) return console.log('Already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}