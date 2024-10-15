import Dashboard from "@/models/dashboard";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
export async function GET(request){
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const donationId = searchParams.get('donationId');
        const dashboard = await Dashboard.find({donationId:donationId});
        return NextResponse.json({ dashboard }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }   
}