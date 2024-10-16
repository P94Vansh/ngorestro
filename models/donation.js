const mongoose=require("mongoose");
const DonationSchema=new mongoose.Schema({
  status:{
    type:String,
    required:true,
    default:"pending",
  },
  donationId:{
    type:String,
    required:true,
    unique:true,
  },
  userName:{
    type:String,
    required:true,
  },
 donationType:{
  type:String,
  required:true,
  enum:["lunch","snacks","meals"]
 },
quantity:{
  type:Number,
},
address:{
  type:String,
  required:true, 
},
expirationTime:{
  type:Date,
  },
 phoneNumber:{
  type:Number,
  required:true,
  },
foodDescription:{
  type:String,
}
},{timestamps:true});
export default mongoose.models.Donation || mongoose.model("Donation",DonationSchema);