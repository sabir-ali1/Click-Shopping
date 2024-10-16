const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried: true
    },
    username:{type:String,requried:true,requried:true},
    phone:{type:Number,required:true},
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
   
});


const Address = new mongoose.model('Address',addressSchema);

module.exports = Address