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

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center"
                            >
                                {/* Image + Content */}
                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        src={`http://localhost:5000/uploads/${item.Icon}`}
                                        alt="Icon"
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />

                                    <p className="text-gray-800 font-semibold text-lg">
                                        {item.Number}
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
                        ))
                    ) : (
                        <p className="text-gray-500 text-center w-full">No Data Found</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default AboutMiddle;