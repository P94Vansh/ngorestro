import Dashboard from "@/models/dashboard";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { donationId, NGOId } = body;
        const dashboard = new Dashboard({ donationId, NGOId });
        await dashboard.save();
        return NextResponse.json({ message: "Request sent successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
export async function GET(request){
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const NGOId = searchParams.get('NGOId');
        const dashboard = await Dashboard.find({NGOId:NGOId});
        return NextResponse.json({ dashboard }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }   
}

export async function DELETE(request) {
    try {
        await connectDB();
        const { donationId, NGOId } = await request.json();

        // Validate input
        if (!donationId || !NGOId) {
            return NextResponse.json({ message: "Donation ID and NGO ID are required" }, { status: 400 });
        }

        const result = await Dashboard.deleteOne({ donationId, NGOId });

        // Check if the donation was found and deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Donation not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Donation deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting donation:", error);
        return NextResponse.json({ message: "Donation deletion failed" }, { status: 500 });
    }
}
