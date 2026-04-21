require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const connectToMongo = require("./db/index");
const routes = require("./routes/index");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"]
}));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

connectToMongo();

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`server is running on: http://localhost:${PORT}`)
})