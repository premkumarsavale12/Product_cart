
const mongoose = require('mongoose');

const aboutheroSchema = new mongoose.Schema({

    heading: {
        type: String,
        required: true,
    },

    Description: {
        type: String,
        required: true,

    },

    Image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("abouthero", aboutheroSchema);