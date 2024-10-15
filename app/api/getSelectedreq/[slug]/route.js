import mongoose from "mongoose";
import Donation from "@/models/donation";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const donations = await Donation.find({
            userName: params.slug,
            $or: [{ status: "selected" }, { status: "accepted" }]
        });
        return NextResponse.json({ success: true, donations }, { status: 200 });
    } catch (error) {
        console.error("Error fetching donations:", error); // Added error logging
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}