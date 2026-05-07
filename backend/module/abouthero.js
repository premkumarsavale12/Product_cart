
const mongoose = require('mongoose');

const aboutheroSchema = new mongoose.Schema({

    heading: {
        type: String,
        required: true,
    },

    Description: {
        type: String,


    },

    Image: {
        type: String,

    }

});

module.exports = mongoose.model("abouthero", aboutheroSchema);