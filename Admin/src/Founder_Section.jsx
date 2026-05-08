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

            <div className="data-list">

                {data.map((item, index) => (

                    <div className="data-row" key={index}>

                        <img
                            src={`http://localhost:5000/uploads/${item.Image}`}
                            className="slider-img"
                            alt={item.Name}
                        />

                        <p className="slider-text">{item.Name}</p>

                        <p className="slider-text">{item.Role}</p>

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
    );
};

export default Founder_Section;