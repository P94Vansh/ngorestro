const mongoose=require("mongoose")
const SignupSchema=new  mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true,
},
password:{
  type:String,
  required:true
},
organisationType :{
  type:String,
  required:true,
  enum:["Restaurant","NGO"]
},
fullName:{
  type:String,
  required:true,
},
username:{
type:String,
required:true,
unique:true,
},
phoneNumber:{
  type:Number,
  required:true,
},
organisationName:{
  type:String,
  required:true,
}},
{timestamps:true});
export default mongoose.models.Signup || mongoose.model("Signup",SignupSchema);