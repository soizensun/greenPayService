const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: {type: String, required: true},
    tag: {type: [String], required: true},
    description: {type: String, required: true},
    logo: {type: String},
    ownerId: {type: String, required: true}
})

module.exports = User = mongoose.model("shop", userShema); 