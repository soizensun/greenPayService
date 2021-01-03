const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String},
    dedscription: {type: String},
    isWeeklyProject: {type: Boolean, default: false},
    budget: {type: Number},
    createAt: {type: Date, default: Date.now }
})