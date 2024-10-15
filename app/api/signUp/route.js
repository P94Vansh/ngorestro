import Signup from "@/models/signup";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const {
            email,
            password,
            organisationType,
            fullName,
            username,
            phoneNumber,
            organisationName,
            location,// Expecting location as { type: 'Point', coordinates: [lng, lat] }
            upiId,
        } = body;

        // Validate location
        if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            return NextResponse.json({ error: "Invalid location data" }, { status: 400 });
        }

        // Check for existing user
        const existingUser = await Signup.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Signup({
            email,
            password: hashedPassword,
            organisationType,
            fullName,
            username,
            phoneNumber,
            organisationName,
            location,
            upiId,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return NextResponse.json({ success: true, message: "User created successfully", token }, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Convert userId to ObjectId
        const useridtoobj = new mongoose.Types.ObjectId(userId);

        // Find the user by _id
        const user = await Signup.findOne({ _id: useridtoobj });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            organisationType: user.organisationType,
            organisationName: user.organisationName,
            phoneNumber: user.phoneNumber,
            location: user.location,
            NoofDonations: user.NoofDonations,
            upiId: user.upiId
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request) {
  try {
      await connectDB();
      const { userId } = await request.json();

      if (!userId) {
          return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }

      const result = await Signup.findByIdAndUpdate(
          userId,
          { $inc: { NoofDonations: 1 } },
          { new: true }
      );

      if (!result) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "Donation count updated successfully", donationCount: result.donationCount }, { status: 200 });

  } catch (error) {
      console.error('Error updating donation count:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}