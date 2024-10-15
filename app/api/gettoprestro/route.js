import connectDB from "@/db/connectDB";
import Signup from "@/models/signup";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        // Query to find top 3 restaurants with the highest NoofDonation
        const topRestaurants = await Signup.find({ organisationType: "Restaurant" })
            .sort({ NoofDonations: -1 }) // Sort by NoofDonation in descending order
            .limit(3); // Limit to top 3

        return NextResponse.json({ success: true, data: topRestaurants }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}