
const mongoose = require("mongoose");

const sellingSchema = new mongoose.Schema({

    Image: {
        type: String,
    },

    Name: {
        type: String,
    },

    Price: {
        type: String
    },
    Old_Price: {
        type: String
    }

});


module.exports = mongoose.model("sellingproduct", sellingSchema);