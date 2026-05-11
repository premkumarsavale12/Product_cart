
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

const Discount = require("../module/Discount_Sales");

//FOR get all 

router.get("/all", async (req, res) => {

    try {

        const data = await Discount.find();
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ err: err.message });
    }

});

// for get id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Discount.findById(req.params.id);
        res.json(data);
    }

    catch (err) {

        res.status(500).json({ err: err.message });

    }

});


// for post method 
// image 

router.post("/add", upload.single('image'), async (req, res) => {
    try {

        const savedata = await Discount.create({
            image: req.file ? req.file.filename : req.body.image,
            sale_name: req.body.sale_name,
            time: req.body.time,
            product_name: req.body.product_name,
            price: req.body.price,
            old_price: req.body.old_price,
            Button: req.body.Button
        })


        res.status(201).json(savedata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });
    }

});


// for put method 

router.put("/:id", upload.single('image'), async (req, res) => {

    try {

        const updateddata = await Discount.findByIdAndUpdate(
            req.params.id,
            {
                sale_name: req.body.sale_name,
                time: req.body.time,
                product_name: req.body.product_name,
                price: req.body.price,
                old_price: req.body.old_price,
                Button: req.body.Button,

                ...(req.file && { ProductImage: req.file.filename })


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

        const deletedata = await Discount.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found Item" });
        res.json("Deleted SuccessFully......");

    }

    catch (err) {

        console.log(err);

        res.status(500).json({ message: err.message });

    }

})

module.exports = router;
