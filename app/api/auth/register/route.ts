import { NextRequest, NextResponse } from "next/server";
import { ConnectToDB } from "@/utils/db";
import User from "@/models/user";
import { json } from "stream/consumers";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest) {
    try {
    const {email,password} = await req.json()
    if(!email || !password){
        return NextResponse.json(
            {error: "Email and password are required"},
            {status: 400}
        )
    }

    await ConnectToDB()

    const exsistingUser = await User.findOne({email})

    if (exsistingUser) {
        return NextResponse.json(
            {error: "Email is already register"},
            {status: 400}
        );
    }
     // Hash the password before saving
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);


    await User.create({
        email,
        password : hashedPassword,
    })

    return NextResponse.json(
        {message: "User register Successfully"},
        {status: 201}
    )

    } catch (error) {
        return NextResponse.json(
            {error: "Failed to register User"},
            {status: 500}
        )
    }
}

