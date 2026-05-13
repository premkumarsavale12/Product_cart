const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require('multer');


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

const Selling_Product = require("../module/selling_product");

// for get all 

router.get("/all", async (req, res) => {

    try {
        const data = await Selling_Product.find();
        res.json(data);
    }

    catch (err) {

        res.status(500).json({ err: err.message });
    }
});

// for get id 

router.get("/:id", async (req, res) => {

    try {

        const data = await Selling_Product.findById(req.params.id);
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for post method 

router.post("/add", upload.single("Image"), async (req, res) => {

    try {

        const savedata = await Selling_Product.create({
            Image: req.file ? req.file.filename : req.body.Image,
            Name: req.body.Name,
            Price: req.body.Price,
            Old_Price: req.body.Old_Price,
        });
        res.status(201).json(savedata);
    }

    catch (er) {
        res.status(500).json({ message: err.message });
    }

});

// for put method 

router.put("/:id", upload.single("Image"), async (req, res) => {

    try {

        const updateddata = await Selling_Product.findByIdAndUpdate(
            req.params.id,
            {

                Name: req.body.Name,
                Price: req.body.Price,
                Old_Price: req.body.Old_Price,
                ...(req.file && { Image: req.file.filename })
            },
            { new: true }
        );
        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// for delete 

router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await Selling_Product.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found Items...." });
        res.json("Deleted SuccessFully....");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
