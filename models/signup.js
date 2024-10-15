const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organisationType: {
    type: String,
    required: true,
    enum: ["Restaurant", "NGO"],
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  organisationName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  upiId: {
    type: String,
    match: [/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Please enter a valid UPI ID'],
  },
  NoofDonations:{
    type:Number,
    required:true,
    default:0
  }
}, { timestamps: true });

// Create a 2dsphere index on the location field for geospatial queries
SignupSchema.index({ location: '2dsphere' });
SignupSchema.pre('save', function(next) {
  if (this.organisationType !== 'Restaurant') {
    this.NoofDonations = undefined; // Remove donationNo if not a Restaurant
    this.upiId = undefined;
  }
  next();
});

export default mongoose.models.Signup || mongoose.model("Signup", SignupSchema);