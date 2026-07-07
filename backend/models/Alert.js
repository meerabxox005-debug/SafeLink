const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    userEmail: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    locationLink: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Alert", alertSchema);