const mongoose = require("mongoose");

const productTagShema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = ProductTag = mongoose.model("productTag", productTagShema); 