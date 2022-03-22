const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");


const newUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(404).send("User Already Exist!");

    const genSalt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, genSalt);
    user = new User({ email, password });

    try {
        const token = user.generateJWT();
        const result = await user.save();
        if (result) return res.send({ token, id: result._id, email, message: "Registration Successful" });
    }
    catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(404).send("Email or Password Incorrect!");

        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser) return res.status(404).send("Email or Password Incorrect!");

        const token = user.generateJWT();
        res.send({ token, id: user._id, email, message: "Login Successful" });
    }
    catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
    }
}

router.route("/signup")
    .post(newUser);

router.route("/login")
    .post(login);

module.exports = router;