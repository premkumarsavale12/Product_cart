
const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({

    sale_name: {

        type: String,
    },

    time: {
        type: String,

    },

    image: {
        type: String,

    },

    product_name: {
        type: String,
    },

    price: {
        type: String,
    },

    old_price: {
        type: String,

    },
    Button: {
        type: String,

    }
})

module.exports = mongoose.model("discount", discountSchema);
