const OrderConfirm = require("../models/orderConfirm");


//order confirmation logic start here 

const addOrderConfirm = async (req,res) => {
    try {
        const {items,username,phone,city,state,country,pincode,address} = req.body;


        const userId = req.user;
        if(!userId){
            return res.status(401).json({error:"Please login to confirm order"})
        }

        const orderConfirm = await OrderConfirm.create({userId,items,username,phone,city,state,country,pincode,address});

        return res.status(201).json({message:"Order Confirm Successfull",orderConfirm});


    } catch (error) {
        console.log("error from add order confirmattion",error);
    }
}


module.exports = {addOrderConfirm}