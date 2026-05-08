
const express = require("express");

const router = express.Router();

const path = require("path");

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

const Founder = require("../module/founder");

// for get all 


router.get("/all", async (req, res) => {

    try {
        const data = await Founder.find();
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }

});

// for get id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Founder.findById(req.params.id);
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }

});

//for get post

router.post("/add", upload.single('Image'), async (req, res) => {

    try {

        const savedata = await Founder.create({
            Image: req.file ? req.file.filename : req.body.Image,
            Name: req.body.Name,
            Role: req.body.Role
        });

        res.status(201).json(savedata);
    }

    catch (err) {
        res.status(500).json({ message: err.message });

    }
});

// for get put (update)

router.put("/:id", upload.single('Image'), async (req, res) => {

    try {

        const updatedata = await Founder.findByIdAndUpdate(
            req.params.id,
            {

                Name: req.body.Name,
                Role: req.body.Role,
                ...(req.file && { Image: req.file.filename })

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

});

// for delete 

router.delete("/:id", async (req, res) => {
    try {

        const deletedata = await Founder.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully...");
        if (!deletedata) return res.status(404).json({ message: "Not Foud Item" });
    }
    catch (err) {

        res.status(500).json({ message: err.message });

    }


})
module.exports = router;