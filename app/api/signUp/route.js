import Signup from "@/models/signup";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import signup from "@/models/signup";
export async function POST(request) {
    try {
        await connectDB();
        const body=await request.json();
        const {email,password,organisationType,fullName,username,phoneNumber,organisationName}=body;
        const existingUser=await Signup.findOne({$or:[{email},{username}]});
        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        let details={email,password:hashedPassword,organisationType,fullName,username,phoneNumber,organisationName};
        const newUser=new Signup(details);
        await newUser.save();
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        return NextResponse.json({success:true,message:"User created successfully",token},{status:201})

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
export async function GET(request) {
    await connectDB();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {// Replace with your database name

    // Find the user by _id
    const useridtoobj=new mongoose.Types.ObjectId(userId);
    const user = await Signup.findOne({ _id: useridtoobj });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ organisationType: user.organisationType,organisationName: user.organisationName,phoneNumber:user.phoneNumber }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
