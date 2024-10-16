const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:{type:String,requried:true},
    email:{type:String,requried:true},
    phone:{type:Number,requried:true},
    password:{type:String,requried:true},
    isAdmin:{type:Boolean, default:false}
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId : this._id,
            email:this.email,
            isAdmin:this.isAdmin
        },
        process.env.secret_key,
        {
            expiresIn: "5d"
        }      
        )
    } catch (error) {
        
    }
}


const User = new mongoose.model('User',userSchema);


module.exports = User;