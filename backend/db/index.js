const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with mongodb successfully ✅")
    } catch (error) {
        console.log("Error while connecting with DB ❌", error.message)
    }
}

module.exports = connectToMongo;