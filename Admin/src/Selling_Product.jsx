import React, { useEffect, useState } from "react";
import axios from "axios";

const Selling_Product = () => {

    const [formdata, setFormdata] = useState({
        Image: null,
        Name: "",
        Price: "",
        Old_Price: "",
    });

    const [previewImage, setPreviewImage] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();

            form.append("Image", formdata.Image);
            form.append("Name", formdata.Name);
            form.append("Price", formdata.Price);
            form.append("Old_Price", formdata.Old_Price);

            await axios.post(
                "http://localhost:5000/api/selling_product/add",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Data Submitted Successfully");
            FetchApiData();
            handleClear();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "Image") {
            setFormdata({
                ...formdata,
                Image: files[0],
            });
            setPreviewImage(URL.createObjectURL(files[0]));

        } else {

            setFormdata({
                ...formdata,
                [name]: value,
            });
        }
    };

    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please select a record first");
            return;
        }

        try {

            const updatedData = new FormData();
            updatedData.append("Name", formdata.Name);
            updatedData.append("Price", formdata.Price);
            updatedData.append("Old_Price", formdata.Old_Price);

            // Only append image if new image selected
            if (formdata.Image) {
                updatedData.append("Image", formdata.Image);
            }

            await axios.put(
                `http://localhost:5000/api/selling_product/${selectedId}`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Updated Successfully");
            FetchApiData();
            handleClear();
        } catch (err) {

            console.log(err);
            alert("Error updating data");

        }
    };

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select a record first");
            return;
        }
        try {

            await axios.delete(
                `http://localhost:5000/api/selling_product/${selectedId}`
            );

            alert("Deleted Successfully");
            FetchApiData();
            handleClear();
        } catch (err) {
            console.log(err);
        }
    };


    const handleClear = () => {
        setFormdata({
            Image: null,
            Name: "",
            Price: "",
            Old_Price: "",
        });

        setPreviewImage("");
        setSelectedId(null);
    };

    const handleSelect = (item) => {

        console.log(item);
        setFormdata({
            Image: null, // cannot set old file in file input
            Name: item.Name || "",
            Price: item.Price || "",
            Old_Price: item.Old_Price || "",
        });

        setPreviewImage(item.Image);
        setSelectedId(item._id || item.id);
    };

    const FetchApiData = async () => {

        try {
            const res = await axios.get(
                "http://localhost:5000/api/selling_product/all"
            );
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="product-container">
            <h1 className="title">Selling Product Page</h1>

            <form
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="Name"
                    value={formdata.Name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="number"
                    placeholder="Enter Product Price"
                    name="Price"
                    value={formdata.Price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <input
                    type="number"
                    placeholder="Enter Old Price"
                    name="Old_Price"
                    value={formdata.Old_Price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                {previewImage && (
                    <img
                        src={
                            formdata.Image
                                ? previewImage
                                : `http://localhost:5000/uploads/${previewImage}`
                        }
                        alt="preview"
                        width="100"
                        height="100"
                        style={{
                            objectFit: "cover",
                            marginTop: "10px",
                            borderRadius: "10px",
                        }}
                    />
                )}

                <div className="md:col-span-3 flex flex-wrap gap-4 justify-center mt-4">

                    <button type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        className="bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </form>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center"
                    >

                        <img
                            src={`http://localhost:5000/uploads/${item.Image}`}

                            className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <p className="text-gray-800 font-semibold text-lg">
                            {item.Name}
                        </p>

                        {/* Button */}
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

export default Selling_Product;