const mongoose = require("mongoose");

const orderShema = new mongoose.Schema({
    userId: {type: String, required: true},
    shopId: {type: String, required: true},
    products: {type: [Object], required: true},
    createdAt: {type: Date, default: new Date(), required: true}
})

module.exports = Order = mongoose.model("order", orderShema); 