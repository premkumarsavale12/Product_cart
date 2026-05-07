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

            console.log(res.data);

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


                <div className="data-list">
                    {data.map((item, index) => (
                        <div className="data-row" key={index}>
                            <img
                                src={`http://localhost:5000/uploads/${item.Image}`}
                                className="slider-img"
                            />
                            <p className="slider-text">{item.heading}</p>
                            <p className="slider-text">{item.Description}</p>
                            <button
                                className="select-btn"
                                onClick={() => handleSelect(item)}
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