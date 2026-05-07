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

const AboutHero = require("../module/abouthero");
const abouthero = require("../module/abouthero");


// for get all

router.get("/all", async (req, res) => {

    try {
        const data = await AboutHero.find();
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for get id 

router.get("/:id", async (req, res) => {

    try {
        const data = await AboutHero.findById(req.params.id);
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }

});

// for post 

router.post("/add", upload.single('Image'), async (req, res) => {

    try {

        const savedata = await abouthero.create({
            Image: req.file ? req.file.filename : req.body.Image,
            heading: req.body.heading,
            Image: req.body.Image,
        });
        res.status(201).json(saveata);
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }

});


// for put 

router.put("/:id", async (req, res) => {

    try {

        const updateddata = await abouthero.findByIdAndUpdate(
            req.params.id,
            {
                Image: req.body.Image,
                heading: req.body.heading,
                Description: req.body.Description,

                ...(req.file && { Image: req.file.filename })
            },

            { returnDocument: 'after' }

        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

})

// for delete 

router.delete("/:id", async (req, res) => {
    try {


        const deletedata = await abouthero.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully....");
        if (!deletedata) return res.status(404).json({ message: "Not Found  Items " });

    }

    catch (err) {

         res.status(500).json({ message: err.message });

    }

});

 module.exports = router;
  

