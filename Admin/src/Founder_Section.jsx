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

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={handleChange}
                />

                {formdata.Image && typeof formdata.Image === 'string' && (
                    <img
                        src={`http://localhost:5000/uploads/${formdata.Image}`}
                        alt="Founder"
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            marginTop: '10px'
                        }}
                    />
                )}

                <input
                    type="text"
                    placeholder="Enter Name"
                    name="Name"
                    onChange={handleChange}
                    value={formdata.Name}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Role"
                    name="Role"
                    onChange={handleChange}
                    value={formdata.Role}
                    required
                />

                <div className="button-group">

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>

                    <button
                        type="button"
                        className="update-btn"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
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
                        {/* Image + Info */}
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

                            {/* Button */}
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