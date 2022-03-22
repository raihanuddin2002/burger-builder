const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;

// Database Connection
mongoose.connect(process.env.MONGODB_SERVER)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log("Database Connection Failed!"))

app.listen(port, () => console.log("Burger Builder server listhening on port:", port));