import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import fuser from "@/models/fuser";

export async function POST(req,res){
    try{
        const {NGOname,Restaurantname,Rating,Address}=await req.json();
        await connectDB();
        const feedback=new fuser({NGOname,Restaurantname,Rating,Address});
        await feedback.save();
        return NextResponse.json({success:true,message:"Feedback submitted successfully"});
    }catch(error){
        return NextResponse.json({success:false,message:"Error submitting feedback"});
    }
}
export async function GET(req){
    try{
        await connectDB();
        const feedback=await fuser.find();
        return NextResponse.json({success:true,feedback});
    }catch(error){
        return NextResponse.json({success:false,message:"Error fetching feedback"});
    }
}