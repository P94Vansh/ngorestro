import Donation from "@/models/donation";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await connectDB();
        const {searchParams}=new URL(request.url);
        const donationId=searchParams.get("donationId");
        const donations=await Donation.find({donationId});
        return NextResponse.json({donations},{status:200});
    }catch(error){
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}