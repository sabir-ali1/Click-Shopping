require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const app = express();
const cors = require('cors')
const userRouter = require("./router/user");
const prouductRouter = require("./router/product");
const cartRouter = require("./router/cart");
const addressRouter = require("./router/address");
const orderConfirmRouter = require("./router/orderConfirm");


const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials : true
}

app.use(cors(corsOption));

app.use(express.json());

//home page route
app.get("/", (req, res) => {
    return res.status(201).json({ message: "welcome to home page" })
});

//user router
app.use("/api/auth",userRouter);

//product router
app.use("/api/product",prouductRouter);

//cart router
app.use("/api/cart",cartRouter);

//address router
app.use("/api/address",addressRouter);

//order confirm
app.use("/api/order",orderConfirmRouter)

const PORT = 5000

connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost${PORT}`);
    });
})