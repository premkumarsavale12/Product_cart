
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    Heading: {
        type: String,
    },

    Icon: {
        type: String,
        required: true
    },

    Name: {
        type: String,

    }
});

module.exports = mongoose.model("category", categorySchema);