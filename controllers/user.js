const User = require("../models/user");
const bcrypt = require("bcrypt");

//register logic start here
const register = async (req,res) => {
    try {
        const {username,email,phone,password} = req.body;

        //user check user is exist or not
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"Email is already exist"});
        }

        //hash Password
        const saltRound = 10
        const hashPassword = await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({username,email,phone,password:hashPassword});

        return res.status(201).json({message:`Register Successfull ${userCreated.username}`, token : await userCreated.generateToken(), userId : userCreated._id.toString()})

    } catch (error) {
        console.log("error from register",error);
    }
}


//login loic
const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        //userExist 
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //compare password
        const user = await bcrypt.compare(password,userExist.password);

        if(user){
            return res.status(201).json({message:`Login successfull ${userExist.username}`, token : await userExist.generateToken(), userId : userExist._id.toString()})
        }else{
            return res.status(400).json({message:"Invalid credentials"})
        }

    } catch (error) {
        console.log("error from login logic",error);
    }
}


//get user data from 
const getUser = async (req,res) => {
    try {
        const userData = req.user;

        return res.status(201).json(userData);

    } catch (error) {
        console.log("error from get user data",error);
    }
}


module.exports = {register,login,getUser}