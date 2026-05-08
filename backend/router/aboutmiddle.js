
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

router.post("/add", upload.any(), async (req, res) => {

    try {

        const iconFile = req.files?.find(f => f.fieldname.trim() === "Icon");


        const body = {};
        for (const key of Object.keys(req.body)) {
            body[key.trim()] = req.body[key];
        }

        const savedata = await AboutMiddle.create({
            Icon: iconFile ? iconFile.filename : body.Icon,
            Number: body.Number,
            Data: body.Data
        });
        res.status(201).json(savedata);

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});

// for put method 
router.put("/:id", upload.any(), async (req, res) => {

    try {

        const iconFile = req.files?.find(f => f.fieldname.trim() === "Icon");


        const body = {};
        for (const key of Object.keys(req.body)) {
            body[key.trim()] = req.body[key];
        }

        const updateddata = await AboutMiddle.findByIdAndUpdate(
            req.params.id,
            {
                Icon: body.Icon,
                Number: body.Number,
                Data: body.Data,

                ...(iconFile && { Icon: iconFile.filename })
            },
            { new: true }
        );

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

        if (!deletedata) return res.status(404).json({ message: "Not Found Item" });
        res.json("Deleted SuccessFully....");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
})


router.use((err, req, res, next) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            message: `Unexpected file field: "${err.field}". Expected field name is "Icon".`
        });
    }
    if (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
});

module.exports = router;