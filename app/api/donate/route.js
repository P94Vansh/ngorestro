import connectDB from "@/db/connectDB";
import Donation from "@/models/donation";
import { NextResponse } from "next/server";
export async function POST(request){
    try{
        await connectDB();
        const body=await request.json();
        const {status,donationId,userName,donationType,quantity,address,expirationTime,phoneNumber,foodDescription}=body;
        const newDonation=new Donation({status,donationId,userName,donationType,quantity,address,expirationTime,phoneNumber,foodDescription});
        await newDonation.save();
        return NextResponse.json({success:true,message:"Donation successful"},{status:201});
    } catch (error) {
        return NextResponse.json({success:false,error:error.message},{status:500});
    }
}
export async function GET(request){
    try{
        await connectDB();
        const donations=await Donation.find();
        return NextResponse.json({success:true,donations},{status:200});
    }catch(error){
        return NextResponse.json({success:false,error:error.message},{status:500});
    }
}
export async function PUT(request){
    try{
        await connectDB();
        const body=await request.json();
        const {status,donationId}=body;
        await Donation.findOneAndUpdate({donationId},{$set:{status}});
        return NextResponse.json({success:true,message:"Donation updated successfully"},{status:200});
    }catch(error){
        return NextResponse.json({success:false,error:error.message},{status:500});
    }
}
export async function DELETE(request){
try{
    await connectDB()
    const body=await request.json()
    const {donationId}=body;
    const result=await Donation.deleteOne({donationId});
    if(result.deletedCount===0){
        return NextResponse.json({success:false,message:"Donation not found"},{status:404});
    }
    return NextResponse.json({success:true,message:"Donation deleted successfully"},{status:200});
}
catch(error){
    return NextResponse.json({success:false,error:error.message},{status:500});
}
}
