import mongoose from "mongoose";
import Donation from "@/models/donation";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    try{
        await connectDB();
        const donations=await Donation.find({userName:params.slug,$or:[{status:"selected"},{status:"accepted"}]});
        return NextResponse.json({donations},{status:200});
    }catch(error){
        console.log(error.message);
    }
}