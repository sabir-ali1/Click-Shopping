const Cart = require("../models/cart")


//add to cart 
const addToCart = async (req, res) => {
    try {
        const { productId, name, title, img, price, qty } = req.body;

        const userId = req.user;

        let cart = await Cart.findOne({ userId });


        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price * qty
        } else {
            cart.items.push({ productId, name, title, img, price, qty });
        }

        await cart.save();

        return res.status(201).json({ message: "Item Added Successfull", cart })

    } catch (error) {
        console.log("error from add to cart", error);
    }

}

//get cart item
const getCart = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(401).json({ message: "invalid id" });
        }

        return res.status(201).json({ message: "user cart", cart })

    } catch (error) {
        console.log("error from get to cart", error);
    }
}

//decreasen qty
const decreaseQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(401).json({ message: "invalid id" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            if (item.qty > qty) {
                const pricePerUnit = item.price / item.qty;
                item.qty -= qty;
                item.price -= pricePerUnit * qty
            } else {
                cart.items.splice(itemIndex, 1)
            }
        } else {
            return res.status(401).json({ message: "invalid token" })
        }

        await cart.save();

        return res.status(201).json({message:"Decrease qty",cart})

    } catch (error) {
        console.log("error from decrease qty",error);
    }
}

//delete product 
const deleteProduct = async (req,res) => {
    try {
       const productId = req.params.productId;

       const userId = req.user;

       const cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(401).json({message:"invalid token"})
        }

        cart.items = cart.items.filter((item)=> item.productId.toString() !== productId);

        await cart.save();
        return res.status(201).json({message:"delete product",cart})

    } catch (error) {
        console.log("error from delete product",error);
    }
}

//remove all cart item
const removeAllProduct = async (req,res) => {
    try {
        const userId = req.user

        const cart = await Cart.findOne({userId});

        if(!cart){
            cart = new Cart({item:[]})
        }else{
            cart.items = []
        }

        await cart.save();
        return res.status(201).json({message:"remove all product",cart})

    } catch (error) {
        console.log("error from romve all product",error);
    }
}


module.exports = { addToCart, getCart,decreaseQty,deleteProduct,removeAllProduct }