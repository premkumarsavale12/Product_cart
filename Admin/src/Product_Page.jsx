import React, { useState } from "react";
import axios from "axios";
import "./ProductPage.css";


const Product_Page = () => {
    const [formdata, setFormData] = useState({
        ProductName: "",
        ProductPrice: "",
        Productquantity: "",
        ProductImage: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "ProductImage" ? files[0] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("ProductName", formdata.ProductName);
            data.append("ProductPrice", formdata.ProductPrice);
            data.append("Productquantity", formdata.Productquantity);
            data.append("ProductImage", formdata.ProductImage);

            const res = await axios.post(
                "http://localhost:5000/api/product/add",
                data
            );

            console.log(res.data);
            alert("Data Submitted Successfully");
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="product-container">
            <h1 className="title">Product Page</h1>

            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="ProductName"
                    onChange={handleChange}
                    value={formdata.ProductName}
                    required
                />

                <input
                    type="number"
                    placeholder="Enter Product Price"
                    name="ProductPrice"
                    onChange={handleChange}
                    value={formdata.ProductPrice}
                    required
                />

                <input
                    type="number"
                    placeholder="Enter Product Quantity"
                    name="Productquantity"
                    onChange={handleChange}
                    value={formdata.Productquantity}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    name="ProductImage"
                    onChange={handleChange}
                />

                <button type="submit" onSubmit={handleSubmit}>Submit Product</button>
            </form>
        </div>
    );
};

export default Product_Page;
