import connectDB from "@/db/connectDB";
import ContactForm from "@/models/ContactForm";
import { NextResponse } from "next/server";
export async function POST(request){
    try{
        await connectDB();
        const body=await request.json();
        const {name,email,message}=body;
        const newContact=new ContactForm({name,email,message});
        await newContact.save();
        return NextResponse.json({success:true,message:"Message sent successfully"},{status:201});
    } catch (error) {
        return NextResponse.json({success:false,error:error.message},{status:500});
    }
}