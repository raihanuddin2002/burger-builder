const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
module.exports = function (req, res, next) {
    let token = req.header("Authorization");

    if (!token) return res.status(401).send("Access Denied! No token found");

    try {
        const decoded = jwt.verify(token.split(" ")[1].trim(), process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token!");
    }
}