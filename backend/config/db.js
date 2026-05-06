const mongoose = require('mongoose');


const ConnectDb = async () => {

    try {

        await mongoose.connect("mongodb+srv://premsavale112:prem@cluster0.5vvteao.mongodb.net/e_commerce_product?appName=Cluster0");
        console.log("Database Connected SuccessFully....");
    }
    catch (err) {

        console.log(err);

    }

}

module.exports = ConnectDb;
 
