const mongoose = require("mongoose")

const sellerMoneyHistorySchema = new mongoose.Schema({
    shopId: {type: String, required: true},
    receivedMoney: {type: Number , required: true},
    receivedDate: {type: Date, default: new Date()},
})

module.exports = SellerMoneyHistory = mongoose.model("sellerMoneyHistory", sellerMoneyHistorySchema); 
