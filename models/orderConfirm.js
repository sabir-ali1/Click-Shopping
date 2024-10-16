const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        requried: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    img: { type: String, required: true },
});


const orderConfirmationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartSchema],
    username: { type: String, requried: true, requried: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
});


const OrderConfirm = new mongoose.model('OrderConfirm',orderConfirmationSchema);


module.exports = OrderConfirm;