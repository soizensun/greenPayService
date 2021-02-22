const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String , required: true},
    mainPicture: {type: [String] , required: true},
    description: {type: String , required: true},
    isWeeklyProject: {type: Boolean, default: false, required: true},
    budget: {type: Number, required: true},
    targetBudget: {type: Number, required: true},
    creatdeAt: {type: Date, default: new Date() , required: true},
    status: {type: Boolean, default: true, required: true},
    isActivate: {type: Boolean, default: true, required: true},
    isClose: {type: Boolean, default: false, required: true}
})

module.exports = Project = mongoose.model("project", projectSchema); 
