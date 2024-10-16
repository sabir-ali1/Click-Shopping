const mongoose = require("mongoose");

const url = process.env.mongo_url

const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("database is connected successfull");
    } catch (error) {
        console.log("db is not connectd");
    }
}

module.exports = connectDb