const { Schema, model } = require("mongoose");

const orderSchema = Schema({
    userId: Schema.Types.ObjectId,
    ingradiants: [{ type: { type: String }, ammount: String }],
    customer: {
        deliveryAdress: String,
        phone: String,
        paymentType: String,

    },
    price: Number,
    orderTime: { type: Date, default: Date.now }
});

module.exports.Order = model("orders", orderSchema);