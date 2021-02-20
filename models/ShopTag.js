const mongoose = require("mongoose");

const shopTagShema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = ShopTag = mongoose.model("shopTag", shopTagShema); 