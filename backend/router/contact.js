
const express = require("express");
const path = require("path");
const router = express.Router();
const Contact = require("../module/contact");
const { route } = require("./discount");

// for get all

router.get("/all", async (req, res) => {


    try {
        const data = await Contact.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for get specific  id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Contact.findById(req.params.id);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for post

router.post("/add", async (req, res) => {

    try {
        const savedata = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        const result = await savedata.save();
        res.status(201).json(result);
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// for update 

router.put("/:id", async (req, res) => {
    try {

        const updateddata = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
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
        const deletedata = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found Item" });
        res.json("Deleted SuccessFully......");
    }

    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

})

module.exports = router;
