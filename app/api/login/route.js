import connectDB from '@/db/connectDB';
import Signup from '@/models/signup';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { username, password } = await request.json();
    try {
        await connectDB();
        
        
        const user = await Signup.findOne({ username });
        
        if (user) {
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(passwordMatch){
                const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
                return NextResponse.json({ success: true, message: 'Login successful',token }, { status: 200 });
            }
            else{
                return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}