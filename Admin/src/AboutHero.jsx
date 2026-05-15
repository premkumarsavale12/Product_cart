import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AboutHero = () => {
    const [formdata, setFormdata] = useState({
        heading: "",
        Description: "",
        Image: ""
    });

    useEffect(() => {
        FetchApiData();
    }, []);

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormdata({
            ...formdata,
            [name]: name === "Image" ? files[0] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            data.append("Image", formdata.Image);
            data.append("heading", formdata.heading);
            data.append("Description", formdata.Description);

            const res = await axios.post(
                "http://localhost:5000/api/about/add",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Data Submitted Successfully....");
            FetchApiData();
            handleClear();

        } catch (err) {

            console.log(err.response?.data || err.message);
            alert("Error submitting data...");
        }
    };

    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First....");
            return;
        }
        try {
            const data = new FormData();
            data.append("Image", formdata.Image);
            data.append("heading", formdata.heading);
            data.append("Description", formdata.Description);

            await axios.put(
                `http://localhost:5000/api/about/${selectedId}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Updated Successfully....");

            FetchApiData();
            handleClear();

        } catch (err) {
            console.log(err);
            alert("Error Updating data...");
        }
    };

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select a record first....");
            return;
        }

        try {

            await axios.delete(`http://localhost:5000/api/about/${selectedId}`);

            alert("Deleted Successfully....");
            FetchApiData();
            handleClear();

        } catch (err) {
            console.log(err);
            alert("Error deleting data...");

        }
    };
    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/about/all");
            setData(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClear = () => {
        setFormdata({
            heading: "",
            Description: "",
            Image: ""
        });

        setSelectedId(null);
    };


    const handleSelect = (item) => {

        setFormdata({
            heading: item.heading,
            Description: item.Description,
            Image: item.Image,
        });

        setSelectedId(item._id || item.id);
    };

    return (
        <>
            <div className="product-container">
                <h1 className="title">About Hero Section</h1>

                <form
                    className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border items-start"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Enter Heading"
                        name="heading"
                        onChange={handleChange}
                        value={formdata.heading}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />

                    <input
                        type="text"
                        placeholder="Enter Description"
                        name="Description"
                        onChange={handleChange}
                        value={formdata.Description}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />

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
                                    alt="Selected Product Image"
                                    className="w-full h-40 object-cover rounded-xl shadow-md border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

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

                <div className="w-full flex flex-wrap gap-6 mt-10">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="w-full md:w-[48%] flex items-center justify-between bg-white shadow-md hover:shadow-lg transition rounded-xl p-5"
                        >
                         
                            <div className="flex items-center gap-4 flex">
                                <img
                                    src={`http://localhost:5000/uploads/${item.Image}`}
                                    alt={item.heading}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                                <p className="text-gray-800 font-semibold text-lg">
                                    {item.heading}
                                </p>
                            </div>
                     
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
        </>
    );
};
export default AboutHero;