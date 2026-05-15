import React, { useState, useEffect } from 'react';
import axios from "axios";

const Founder_Section = () => {

    const [formdata, setFormData] = useState({
        Image: "",
        Name: "",
        Role: "",
    });

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/founder/all");
            setData(res.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "Image" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("Image", formdata.Image);
            data.append("Name", formdata.Name);
            data.append("Role", formdata.Role);

            await axios.post(
                "http://localhost:5000/api/founder/add",
                data
            );

            alert("Data Submitted Successfully");
            FetchApiData();
            handleClear();
        }

        catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First");
            return;
        }
        try {
            const updatedData = new FormData();
            updatedData.append("Image", formdata.Image);
            updatedData.append("Name", formdata.Name);
            updatedData.append("Role", formdata.Role);

            await axios.put(
                `http://localhost:5000/api/founder/${selectedId}`,
                updatedData
            );

            alert("Updated Successfully");

            FetchApiData();
            handleClear();
        }

        catch (err) {
            console.log(err);
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
                `http://localhost:5000/api/founder/${selectedId}`
            );

            alert("Deleted Successfully");
            FetchApiData();
            handleClear();
        }

        catch (err) {
            console.log(err);
        }
    };

    const handleClear = () => {

        setFormData({
            Image: "",
            Name: "",
            Role: "",
        });
        setSelectedId(null);
    };

    const handleSelect = (item) => {
        setFormData({
            Image: item.Image,
            Name: item.Name,
            Role: item.Role,
        });

        setSelectedId(item._id || item.id);
    };

    return (
        <div className="product-container">
            <h1 className="title">Founder Details Page</h1>
            <form
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 items-start"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        name="Image"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />

                    {formdata.Image && typeof formdata.Image === 'string' && (
                        <div className="flex justify-center">
                            <img
                                src={`http://localhost:5000/uploads/${formdata.Image}`}
                                alt="Founder"
                                className="w-full h-40 object-cover rounded-xl shadow-md border border-gray-200"
                            />
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Enter Name"
                    name="Name"
                    onChange={handleChange}
                    value={formdata.Name}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                <input
                    type="text"
                    placeholder="Enter Role"
                    name="Role"
                    onChange={handleChange}
                    value={formdata.Role}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
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
                        <div className="flex items-center gap-4 flex-1">
                            <img
                                src={`http://localhost:5000/uploads/${item.Image}`}
                                alt={item.Name}
                                className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <p className="text-gray-800 font-semibold text-lg">
                                {item.Name}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {item.Role}
                            </p>
                            <button
                                onClick={() => handleSelect(item)}
                                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                            >
                                Select
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Founder_Section;