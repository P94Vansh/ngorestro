import mongoose from "mongoose";

const fuserSchema=new mongoose.Schema({
    NGOname:{
        type:String,
        required:true,
    },
    Restaurantname:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    Rating:{
        type:Number,
        required:true,
    },
    
    
});

const fuser=mongoose.models.fuser || mongoose.model('fuser',fuserSchema);

export default fuser;