
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')

const port = 5000;

const ConnectDb = require("./config/db");

const ProductRoute = require("./router/product");
const SliderRoute = require("./router/slider");

ConnectDb();

app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/product", ProductRoute);
app.use("/api/slider", SliderRoute);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});
