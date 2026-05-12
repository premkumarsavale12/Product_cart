
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

const port = 5000;

const ConnectDb = require("./config/db");

const ProductRoute = require("./router/product");
const SliderRoute = require("./router/slider");
const AboutRoute = require("./router/abouthero");
const AboutMiddleRoute = require("./router/aboutmiddle");
const FounderRoute = require("./router/founder");
const Auth = require("./router/auth");
const Discount = require("./router/discount");
const Contact = require("./router/contact");
 


ConnectDb();

app.use(express.json());
app.use(cors())

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/product", ProductRoute);
app.use("/api/slider", SliderRoute);
app.use("/api/about", AboutRoute);
app.use("/api/aboutmiddle", AboutMiddleRoute);
app.use("/api/founder", FounderRoute);
app.use("/api/auth", Auth);
app.use("/api/discount", Discount);
app.use("/api/contact",Contact )


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});
