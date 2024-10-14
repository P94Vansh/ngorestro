import mongoose from "mongoose";

const DashboardSchema=new mongoose.Schema({
    donationId:{
        type:String,
        required:true,
    },
    NGOId:{
        type:String,
        required:true,
    }
});
DashboardSchema.index({donationId:1,NGOId:1},{unique:true});


export default mongoose.models.Dashboard || mongoose.model("Dashboard",DashboardSchema);
