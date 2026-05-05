
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    ProductName: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: String,
        required: true
    },

    Productquantity: {
        type: String,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    Button: {
        type: String,
        required : true 

    }

})

module.exports = mongoose.model("product", productSchema);


