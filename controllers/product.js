const Product = require("../models/product");


//create product logic
const addProduct = async (req, res) => {
    try {

        const { name, title, price, description, category,img } = req.body;

        const createProduct = await Product.create({ name, title, price, description, category,img });

        return res.status(201).json({ message: "Add Product", createProduct });

    } catch (error) {
        console.log("error from add product", error);
    }
}

//get product
const getProduct = async (req, res) => {
    try {
        // Find all products and sort by creation date in descending order (newest first)
        const product = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json(product);

    } catch (error) {
        console.log("Error from getProduct:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//edir product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, price, description, category, img } = req.body; 

        const edit = await Product.findByIdAndUpdate(id, { name, title, price, description, category, img });

        if (!edit) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product edit successful", edit });
    } catch (error) {
        console.error("Error from edit product:", error);
        return res.status(500).json({ message: "An error occurred while editing the product" });
    }
};

//get single product
const getSingelProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(201).json(product)

    } catch (error) {
        console.log("error from get singel product",error);
    }
}



module.exports = {addProduct, getProduct,editProduct,getSingelProduct}