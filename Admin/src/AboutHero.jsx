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

                <form className="product-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter Heading"
                        name="heading"
                        onChange={handleChange}
                        value={formdata.heading}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Enter Description"
                        name="Description"
                        onChange={handleChange}
                        value={formdata.Description}
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        name="Image"
                        onChange={handleChange}
                    />


                    {formdata.Image && typeof formdata.Image === 'string' && (
                        <img
                            src={`http://localhost:5000/uploads/${formdata.Image}`}
                            alt="Selected Product Image"
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                        />
                    )}

                    <div className="button-group">

                        <button
                            type="submit"
                            className="submit-btn"
                        >
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


                <div className="w-full flex flex-wrap gap-6 mt-10">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="w-full md:w-[48%] flex items-center justify-between bg-white shadow-md hover:shadow-lg transition rounded-xl p-5"
                        >
                            {/* Image + Text */}
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
        </>
    );
};

export default AboutHero;