
'use Strinct'

import mongoose from "mongoose"

export const dbConnection = async() => {
    try {
        mongoose.connection.on('error',() =>{
            console.log('MongoDB | Could not be connect to mongodb');
            mongoose.disconnect();
        })

        mongoose.connection.on('connecting',() =>{
            console.log('MongoDB | Try connecting');
        })

        mongoose.connection.on('connected',() =>{
            console.log('MongoDB | connected to mongoDB');
        })
        mongoose.connection.on('open',() =>{
            console.log('MongoDB | reconnected to database');
        })
        mongoose.connection.on('reconnected',() =>{
            console.log('MongoDB | reconnected to mongoDB');
        })
        mongoose.connection.on('disconnected',() =>{
            console.log('MongoDB | disconnected');
        })

        await mongoose.connect(process.env.URL_MONGO,{
            serverSelectionTimeoutMS: 5000
        });
    } catch (e) {
        console.log('database connection failed', e);
    }
}