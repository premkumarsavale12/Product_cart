
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


const Seling_Product = require("../module/selling_product");

// for get all 

router.get("/add", (req, res) => {
    try {

    }
    catch (err) {
        console.log(err);

    }

});

// for get id 

router.get("/:id", (req, res) => {

    try {

    }
    catch (err) {
        console.log(err);

    }
});

// for post method 


router.post("/add", (req, res) => {

    try {

    }

    catch (er) {
        console.log(err);

    }
});

// for put method 

router.put("/:id", (req, res) => {
    try {

    }

    catch (err) {
        console.log(err);

    }

});


// for delete 

router.delete("/:id", (req, res) => {
    try {

    }
    catch (err) {
        console.log(err);

    }
})