import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductPage.css";

const Product_Page = () => {

    const [formdata, setFormData] = useState({
        ProductName: "",
        ProductPrice: "",
        Productquantity: "",
        ProductImage: "",
        category: "",
        Button: "",
    });

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

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
            data.append("category", formdata.category);
            data.append("Button", formdata.Button);


            const res = await axios.post(
                "http://localhost:5000/api/product/add",
                data
            );

            alert("Data Submitted Successfully");
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First....");
            return;
        }

        try {
            const updateData = new FormData();
            updateData.append("ProductName", formdata.ProductName);
            updateData.append("ProductPrice", formdata.ProductPrice);
            updateData.append("Productquantity", formdata.Productquantity);
            updateData.append("category", formdata.category);
            updateData.append("Button", formdata.Button);

            if (formdata.ProductImage) {
                updateData.append("ProductImage", formdata.ProductImage);
            }

            await axios.put(
                `http://localhost:5000/api/product/${selectedId}`,
                updateData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Updated SuccessFully....");
            FetchApiData();
            handleClear();
        }

        catch (err) {
            console.log(err);
            alert("Error Updating data...");
        }
    }

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select a record first....");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/product/${selectedId}`);
            alert("Deleted SuccessFully....");
            handleClear();
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleClear = () => {
        setFormData({
            ProductName: "",
            ProductImage: null,
            Productquantity: "",
            ProductPrice: "",
            category: "",
            Button: "",
        })

    }

    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/product/all");
            setData(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSelect = (item) => {

        setFormData({
            ProductName: item.ProductName,
            ProductPrice: item.ProductPrice,
            Productquantity: item.Productquantity,
            ProductImage: item.ProductImage,
            category: item.category,
            Button: item.Button,

        });
        setSelectedId(item._id || item.id);
    }

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
                {formdata.ProductImage && typeof formdata.ProductImage === 'string' && (
                    <img
                        src={`http://localhost:5000/uploads/${formdata.ProductImage}`}
                        alt="Selected Product Image"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                    />
                )}
                <input
                    type="text"
                    placeholder="Enter Category"
                    name="category"
                    onChange={handleChange}
                    value={formdata.category}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Button Name"
                    name="Button"
                    onChange={handleChange}
                    value={formdata.Button}
                    required
                />
                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="update-btn" onClick={handleUpdate}>Update</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
                </div>
            </form>
            <div className="w-full flex flex-wrap gap-4 mt-10">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="w-full md:w-[48%] flex items-center justify-between bg-white shadow-md hover:shadow-lg transition rounded-xl p-5"
                    >
                        {/* Image + Name */}
                        <div className="flex items-center gap-4 flex">
                            <img
                                src={`http://localhost:5000/uploads/${item.ProductImage}`}
                                alt={item.ProductName}
                                className="w-24 h-24 object-cover rounded-lg border"
                            />

                            <p className="text-gray-800 font-semibold text-lg">
                                {item.ProductName}
                            </p>
                        </div>

                        {/* Price */}
                        <p className="text-green-600 font-bold text-xl w-28 text-center">
                            ₹{item.ProductPrice}
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => handleSelect(item)}
                            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product_Page;