const Address = require("../models/address");

//add address 
const addAddress = async (req, res) => {
    try {
        const { username, phone, city, state, country, pincode, address } = req.body;
            
        const createAddress = await Address.create({ userId: req.user, username, phone, city, state, country, pincode, address });

        return res.status(201).json({message:"Address Add Successfull"});

    } catch (error) {
        console.log("error from add address",error);
    }
}

//get addres 
const getAddress = async (req,res) => {
    try {
        const userId = req.user;
        const userAddress = await Address.findOne({userId});

        if(!userAddress){
            return res.status(404).json({message:"Address Not Found"});
        }

        return res.status(201).json({message:"get address",userAddress});

    } catch (error) {
        console.log("error from get address",error);
    }
}


module.exports = {addAddress,getAddress}