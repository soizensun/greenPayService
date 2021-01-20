const mongoose = require("mongoose")

const addressShema = new mongoose.Schema({
    recipientName: {type: String, required: true},
    recipientSirName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    houseNumber: {type: String, required: true},
    moo: {type: String},
    road: {type: String},
    subDistrict: {type: String},
    district: {type: String, required: true},
    province: {type: String, required: true},
    postCode: {type: String, required: true}
})

module.exports = Address = mongoose.model("address", addressShema); 