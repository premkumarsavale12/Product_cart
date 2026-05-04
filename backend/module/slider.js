const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({

    SliderImage: {
        type: String,
        required: true,
    },

    SliderContent: {
        type: String,

    }

})
module.exports = mongoose.model("Slider", sliderSchema)
