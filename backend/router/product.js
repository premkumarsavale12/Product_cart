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

const Product = require("../module/product");


// for get all 

router.get("/all", async (req, res) => {

    try {

        const data = await Product.find();
        res.json(data);

    }
    catch (err) {
        res.status(500).json({ err: err.message });

    }

});

// for get id 

router.get("/:id", async (req, res) => {

    try {

        const data = await Product.findById(req.params.id);
        res.json(data);

    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }

});

// for add 

router.post("/add", upload.single('ProductImage'), async (req, res) => {

    try {

        const savedata = await Product.create({
            ProductImage: req.file ? req.file.filename : req.body.ProductImage,
            ProductName: req.body.ProductName,
            ProductPrice: req.body.ProductPrice,
            Productquantity: req.body.Productquantity,
            category: req.body.category,
            Button: req.body.Button

        });

        res.status(201).json(savedata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
});


// for update 

router.put("/:id", upload.single('ProductImage'), async (req, res) => {

    try {
        const updateddata = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ProductName: req.body.ProductName,
                ProductPrice: req.body.ProductPrice,
                Productquantity: req.body.Productquantity,
                category: req.body.category,
                Button: req.body.Button,

                ...(req.file && { ProductImage: req.file.filename })

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


// delete 

router.delete("/:id", async (req, res) => {

    try {
        const deletedata = await Product.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully...");
        if (!deletedata) return res.status(404).json({ message: "Not Foud Item" });
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

module.exports = router;

