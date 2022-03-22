const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 1024
    }
});
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, { expiresIn: "60h" });
    return token;
}

module.exports.User = model("User", userSchema);


