const mongoose = require("mongoose");

const sensorInfo = new mongoose.Schema({
    time: { type: "Number", required: true},
    vehicle: { type: Array, required: true},
}, {});

const sensorInfoModel = mongoose.model("frame", sensorInfo, "frame")
module.exports =  {
    sensorInfoModel,
} ;