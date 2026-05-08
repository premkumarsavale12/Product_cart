
const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema({

    Image: {
        type: String,

    },
    Name: {
        type: String
    },

    Role: {
        type: String
    }
})

module.exports = mongoose.model("founder", founderSchema);
