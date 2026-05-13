
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

const Category = require("../module/category");

// for get all 

router.get("/all", async (req, res) => {

    try {
        const data = await Category.find();
        res.json(data);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }

});

// for get specific id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Category.findById(req.params.id);
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for  post method 

router.post("/add", upload.single("Icon"), async (req, res) => {

    try {

        const savedata = await Category.create({

            Icon: req.file ? req.file.filename : req.body.Image,
            Heading: req.file.Heading,
            Name: req.file.Name
        });

        res.status(201).json(savedata)

    }

    catch (err) {
        res.status(500).json({ message: err.message })

    }

});


// for put method 

router.put("/:id", upload.single("Icon"), async (req, res) => {

    try {


        const updateddata = await Category.findByIdAndUpdate(
            req.params.id,
            {
                Icon: req.body.Icon,
                Heading: req.body.Heading,
                Name: req.body.Name,

                ...(req.file && { Icon: req.file.filename })
            },
            { new: true }

        )

        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata);
    }

    catch (err) {
        res.status(500).json({ message: err.message });

    }
});

// for delete method 

router.delete("/:id", async (req, res) => {
    try {

        const deletedata = await Category.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found  Items " });
        res.json("Deleted SuccessFully....");

    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }

})
module.exports = router;
