const mongoose = require("mongoose");

const cartShema = new mongoose.Schema({
    userId: {type: String, required: true},
    product: {type: [Object], required: true}
})

module.exports = Cart = mongoose.model("cart", cartShema); 