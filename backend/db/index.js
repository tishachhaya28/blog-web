const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with mongodb successfully ✅")
    } catch (error) {
        console.log("Error while connecting with DB ❌:", error.message)
        process.exit(1); // Exit if DB connection fails in production
    }
}

module.exports = connectToMongo;