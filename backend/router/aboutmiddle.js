
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

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

const AboutMiddle = require("../module/aboutmiddle");


// for get all

router.get("/all", async (req, res) => {

    try {

        const data = await AboutMiddle.find();
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });

    }
});

// for get id 

router.get("/:id", async (req, res) => {

    try {

        const data = await AboutMiddle.findById(req.params.id);
        res.json(data);

    }
    catch (err) {

        res.status(500).json({ err: err.message });

    }

});

// for post 

router.post("/add", upload.single("Icon"), async (req, res) => {

    try {
        const savedata = await AboutMiddle.create({
            Icon: req.file ? req.file.filename : req.body.Icon,
            Number: req.body.Number,
            Data: req.body.Data
        });
        res.status(201).json(savedata);

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});

// for put method 
router.put("/:id", async (req, res) => {

    try {

        const updateddata = await AboutMiddle.findByIdAndUpdate(
            req.params.id,
            {
                Icon: req.body.Icon,
                Number: req.body.Number,
                Data: req.body.Data,

                ...(req.file && { Icon: req.file.filename })
            },
            { returnDocument: 'after' }
        )


        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for delete 

router.delete("/:id", async (req, res) => {
    try {

        const deletedata = await AboutMiddle.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully....");

        if (!deletedata) return res.status(404).json({ message: "Not Found Item" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });


    }
})

module.exports = router;