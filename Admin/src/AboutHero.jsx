import axios from 'axios';
import React, { useState } from 'react';

const AboutHero = () => {

    const [formdata, setFormdata] = useState({
        heading: "",
        description: "",
        Image: ""
    });

    const [selectedId, setSelectedId] = useState(null);

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
            data.append("description", formdata.description);

            const res = await axios.post(
                "http://localhost:5000/api/about/add",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(res.data);

            alert("Data Submitted Successfully....");

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
            data.append("description", formdata.description);

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

            handleClear();

        } catch (err) {

            console.log(err);
            alert("Error deleting data...");

        }
    };

    const handleClear = () => {

        setFormdata({
            heading: "",
            description: "",
            Image: ""
        });

        setSelectedId(null);
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
                        name="description"
                        onChange={handleChange}
                        value={formdata.description}
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        name="Image"
                        onChange={handleChange}
                    />

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

            </div>
        </>
    );
};

export default AboutHero;