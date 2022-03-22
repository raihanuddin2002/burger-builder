const router = require("express").Router();
const { Order } = require("../models/order");
const authorize = require("../middlewares/authorize");

// Get all Orders
const orderList = async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).sort({ orderTime: -1 });
    res.send(orders);
}
const newOrder = async (req, res) => {
    const order = new Order(req.body);

    try {
        const result = await order.save();
        res.send("Order Placed Successfully!");
    } catch (err) {
        res.status(400).send("Sorry! Something went wrong!!");
    }
}
router.route("/")
    .get(authorize, orderList)
    .post(authorize, newOrder)

module.exports = router;