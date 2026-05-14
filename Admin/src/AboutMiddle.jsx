import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutMiddle = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);
    const [formdata, setFormdata] = useState({
        Icon: "",
        Number: "",
        Data: "",
    });

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/aboutmiddle/all");
            setData(res.data);
        } catch (err) {
            console.log("Fetch Error :", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormdata((prev) => ({
            ...prev,
            [name]: name === "Icon" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const sendData = new FormData();
            sendData.append("Icon", formdata.Icon);
            sendData.append("Number", formdata.Number);
            sendData.append("Data", formdata.Data);

            await axios.post(
                "http://localhost:5000/api/aboutmiddle/add",
                sendData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Data Submitted Successfully");
            FetchApiData();
            handleClear();
        } catch (err) {
            console.log("Submit Error :", err);
        }
    };

    const handleUpdate = async () => {
        if (!selectedId) {
            alert("Please select a record first");
            return;
        }

        try {
            const updateData = new FormData();
            updateData.append("Icon", formdata.Icon);
            updateData.append("Number", formdata.Number);
            updateData.append("Data", formdata.Data);

            await axios.put(
                `http://localhost:5000/api/aboutmiddle/${selectedId}`,
                updateData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Updated Successfully");
            FetchApiData();
            handleClear();
        } catch (err) {
            console.log("Update Error :", err);
            alert("Error Updating Data");
        }
    };

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select a record first");
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/aboutmiddle/${selectedId}`
            );

            alert("Deleted Successfully");
            FetchApiData();
            handleClear();
        } catch (err) {
            console.log("Delete Error :", err);
            alert("Error Deleting Data");
        }
    };

    const handleSelect = (item) => {
        setFormdata({
            Icon: item.Icon,
            Number: item.Number,
            Data: item.Data,
        });

        setSelectedId(item._id);
    };

    const handleClear = () => {
        setFormdata({
            Icon: "",
            Number: "",
            Data: "",
        });

        setSelectedId(null);
    };

    return (
        <div className="product-container">
            <h1 className="title">About Middle Section</h1>

            {/* FORM */}
            <form
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border items-start"
                onSubmit={handleSubmit}
            >
                {/* IMAGE INPUT */}
                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        name="Icon"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl"
                    />

                    {/* IMAGE PREVIEW FIXED */}
                    {formdata.Icon && (
                        <div className="flex justify-center">
                            <img
                                src={
                                    typeof formdata.Icon === "string"
                                        ? `http://localhost:5000/uploads/${formdata.Icon}`
                                        : URL.createObjectURL(formdata.Icon)
                                }
                                alt="Preview"
                                className="w-full h-40 object-cover rounded-xl shadow-md border"
                            />
                        </div>
                    )}
                </div>

                {/* NUMBER */}
                <input
                    type="number"
                    placeholder="Enter Number"
                    name="Number"
                    value={formdata.Number}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl"
                />

                {/* DATA */}
                <input
                    type="text"
                    placeholder="Enter Data"
                    name="Data"
                    value={formdata.Data}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl"
                />

                {/* BUTTONS */}
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

            {/* DATA LIST */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white border rounded-2xl shadow-md p-5 flex flex-col items-center"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={`http://localhost:5000/uploads/${item.Icon}`}
                                    alt="Icon"
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />

                                <p className="font-semibold text-lg">
                                    {item.Number}
                                </p>

                                <button
                                    onClick={() => handleSelect(item)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">
                        No Data Found
                    </p>
                )}
            </div>
        </div>
    );
};

export default AboutMiddle;