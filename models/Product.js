const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    shopId: {type: String, required: true},
    name: {type: String, required: true},
    tagId: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true},
    mainPicture: {type: String},
    morePicture: {type: [String]},
    greenPrice: {type: Number, required: true}
})

module.exports = Product = mongoose.model("product", productShema); 