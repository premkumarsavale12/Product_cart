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

            <form
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="ProductName"
                    onChange={handleChange}
                    value={formdata.ProductName}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="number"
                    placeholder="Enter Product Price"
                    name="ProductPrice"
                    onChange={handleChange}
                    value={formdata.ProductPrice}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="number"
                    placeholder="Enter Product Quantity"
                    name="Productquantity"
                    onChange={handleChange}
                    value={formdata.Productquantity}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="file"
                    accept="image/*"
                    name="ProductImage"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />

                <input
                    type="text"
                    placeholder="Enter Category"
                    name="category"
                    onChange={handleChange}
                    value={formdata.category}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="text"
                    placeholder="Enter Button Name"
                    name="Button"
                    onChange={handleChange}
                    value={formdata.Button}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                {formdata.ProductImage && typeof formdata.ProductImage === 'string' && (
                    <div className="md:col-span-3">
                        <img
                            src={`http://localhost:5000/uploads/${formdata.ProductImage}`}
                            alt="Selected Product"
                            className="w-full h-[300px] object-cover rounded-2xl shadow-lg border"
                        />
                    </div>
                )}

                <div className="md:col-span-3 flex flex-wrap gap-4 justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Clear
                    </button>
                </div>
            </form>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center"
                    >
                        {/* Product Image */}
                        <img
                            src={`http://localhost:5000/uploads/${item.ProductImage}`}

                            className="w-40 h-40 object-cover rounded-xl border mb-4"
                        />

                        {/* Product Name */}
                        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                            {item.ProductName}
                        </h2>

                        {/* Price */}
                        <p className="text-green-600 font-bold text-2xl mb-4">
                            ₹{item.ProductPrice}
                        </p>

                        {/* Select Button */}
                        <button
                            onClick={() => handleSelect(item)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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