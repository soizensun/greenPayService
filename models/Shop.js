const mongoose = require("mongoose");

const shopShema = new mongoose.Schema({
    ownerId: {type: String, required: true},
    name: {type: String, required: true},
    tagId: {type: String, required: true},
    description: {type: String, required: true},
    logo: {type: String},
    shipping: {type: [Object]},
    accountName: {type: String, required: true},
    promptpayNumber: {type: String, required: true},
    totalMoney: {type: Number, required: true},
    isActivate: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: new Date()}
})

module.exports = Shop = mongoose.model("shop", shopShema); 