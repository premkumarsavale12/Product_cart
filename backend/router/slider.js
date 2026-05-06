
const express = require("express");
const path = require("path");

const router = express.Router();
const multer = require('multer');

const Slider = require("../module/slider");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


const upload = multer({ storage });

// for get all

router.get("/all", async (req, res) => {

    try {
        const data = await Slider.find();
        res.json(data);

    }

    catch (err) {
        res.status(500).json({ err: err.message });

    }

});

// for get id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Slider.findById(req.params.id);
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });

    }

});

// for post 
router.post("/add", upload.single("SliderImage"), async (req, res) => {

    try {

        const savedata = await Slider.create({

            SliderImage: req.file ? req.file.filename : req.body.SliderImage,
            SliderContent: req.body.SliderContent,

        })

        res.status(201).json(savedata);

    }

    catch (err) {
        res.status(500).json({ message: err.message });

    }

});

// for delete

router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await Slider.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found items...." });
        res.json("Deleted successfully.");

    }
    catch (err) {

        res.status(500).json({ message: err.message });

    }
});


// for updated

router.put("/:id", upload.single('SliderImage'), async (req, res) => {

    try {

        const updateddata = await Slider.findByIdAndUpdate(
            req.params.id,

            {

                SliderContent: req.body.SliderContent,
                ...(req.file && { SliderImage: req.file.filename })

            },
            { returnDocument: 'after' }

        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });

        res.json(updateddata);

    }


    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

})



module.exports = router;
