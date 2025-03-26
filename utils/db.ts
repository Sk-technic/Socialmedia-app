
import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!; // ! is for chek the connection string is always here

if (!MONGODB_URI) {
    throw new Error('please define mongodb uri in env file')
}

let cached = global.mongoose;

//handle error if cached is not defined...

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

export async function ConnectToDB(){
    if (cached.conn) {
        console.log("✅ Using cached database connection");
        return cached.conn;
    }

    //if connection promise is not 
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        
        cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then(() => {
            console.log("✅ Database connected successfully");
            return mongoose.connection;
        }).catch((err) => {
            console.error("❌ Database connection failed:", err);
            cached.promise = null;
            throw new Error("Database connection error");
        });
    
    }
    
    try{
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw new Error('Check database file')
    }

    return cached.conn;
}
