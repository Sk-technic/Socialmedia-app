import mongoose from "mongoose";
import { cache } from "react";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI!; // ! is for chek the connection string is always here

if (!MONGODB_URI) {
    throw new Error('please define mongodb uri in env file')
}

let cached = global.mongoose;

//handle error if cached is not defined...

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connecttodb(){

    if (cached.conn) {
        return cached.conn
    }
    //if connection is not 
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        
        cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then(()=> mongoose.connection);
    }

    try{
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw new Error('Check database file')
    }

    return cached.conn;
}
