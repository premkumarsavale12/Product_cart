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

            const res = await axios.get(
                "http://localhost:5000/api/aboutmiddle/all"
            );

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

            const res = await axios.post(
                "http://localhost:5000/api/aboutmiddle/add",
                sendData,
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
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
        <>
            <div className="product-container">

                <h1 className="title">About Middle Section</h1>

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="file"
                        accept="image/*"
                        name="Icon"
                        onChange={handleChange}
                    />

                    {formdata.Icon && (
                        <img
                            src={
                                typeof formdata.Icon === "string"
                                    ? `http://localhost:5000/uploads/${formdata.Icon}`
                                    : URL.createObjectURL(formdata.Icon)
                            }
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginTop: "10px",
                            }}
                        />
                    )}

                    <input
                        type="number"
                        placeholder="Enter Number"
                        name="Number"
                        value={formdata.Number}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Enter Data"
                        name="Data"
                        value={formdata.Data}
                        onChange={handleChange}
                        required
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

                <div className="data-list">

                    {data.length > 0 ? (

                        data.map((item) => (

                            <div
                                className="data-row"
                                key={item._id}
                            >

                                <img
                                    src={`http://localhost:5000/uploads/${item.Icon}`}
                                    alt="Icon"
                                    className="slider-img"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                    }}
                                />

                                <p className="slider-text">
                                    {item.Number}
                                </p>

                                <p className="slider-text">
                                    {item.Data}
                                </p>

                                <button
                                    className="select-btn"
                                    onClick={() => handleSelect(item)}
                                >
                                    Select
                                </button>

                            </div>
                        ))

                    ) : (

                        <p>No Data Found</p>

                    )}

                </div>
            </div>
        </>
    );
};
export default AboutMiddle;