const mongoose = require("mongoose");

const shopShema = new mongoose.Schema({
    ownerId: {type: String, required: true},
    name: {type: String, required: true},
    tagId: {type: String, required: true},
    description: {type: String, required: true},
    logo: {type: String},
    shipping: {type: [Object]}
})

module.exports = Shop = mongoose.model("shop", shopShema); 