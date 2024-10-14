import connectDB from "@/db/connectDB";
import Payment from "@/models/upi"; // Ensure correct case
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log(body);

    // Validate input data
    const { userId, quantity, upiId } = body;
    if (!userId || !quantity || !upiId) {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }

    const paymentInstance = new Payment({
      userId,
      quantity,
      upiId,
    });

    const result = await paymentInstance.save();

    return NextResponse.json(
      { success: true, result },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust in production
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: "An error occurred while processing the request", details: error.message }, // Include error details
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust in production
        },
      }
    );
  }
}