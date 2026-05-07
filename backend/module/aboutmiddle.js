const mongoose = require("mongoose");

const aboutmiddleSchema = new mongoose.Schema({

    Icon: {
        type: String,
    },

    Number: {
        type: String,
    },

    Data: {
        type: String,
    }
})
module.exports = mongoose.model("aboutmiddle", aboutmiddleSchema);