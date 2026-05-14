import React, { useState, useEffect } from 'react';
import './Slider.css';
import axios from 'axios';

const Slider = () => {

    const [formdata, setFormData] = useState({
        SliderImage: null,
        SliderContent: ""
    });

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchApiData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "SliderImage") {
            setFormData((prev) => ({
                ...prev,
                SliderImage: files[0]
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append("SliderImage", formdata.SliderImage);
            form.append("SliderContent", formdata.SliderContent);

            const res = await axios.post("http://localhost:5000/api/slider/add", form);

            alert("Data Submitted Successfully!");
            fetchApiData();
            handleClear();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleUpdate = async () => {
        if (!selectedId) {
            alert("Please select a record first...");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/slider/${selectedId}`,
                formdata
            );

            alert("Updated successfully!");
            fetchApiData();
            handleClear();

        } catch (err) {
            console.error(err);
            alert("Error updating data");
        }
    };

    const handleDelete = async () => {
        if (!selectedId) {
            alert("Please select a record first...");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/slider/${selectedId}`);
            alert("Deleted successfully!");
            fetchApiData();
            handleClear();

        } catch (err) {
            console.error(err);
        }
    };

    const fetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/slider/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelect = (item) => {
        setFormData({
            SliderContent: item.SliderContent,
            SliderImage: item.SliderImage,
        });

        setSelectedId(item._id || item.id);
    };

    const handleClear = () => {
        setFormData({
            SliderImage: null,
            SliderContent: ""
        });
        setSelectedId(null);
    };

    return (
        <div className="slider-container">
            <h1 className="slider-title">Slider Admin Panel</h1>

            <form className="slider-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="SliderImage"
                        required
                        onChange={handleChange}
                    />

                    {
                        formdata.SliderImage && typeof formdata.SliderImage === 'string' && (
                            <img
                                src={`http://localhost:5000/uploads/${formdata.SliderImage}`}
                                alt="Selected Product Image"
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                            />
                        )
                    }

                </div>

                <div className="form-group">
                    <label>Slider Text</label>
                    <input
                        type="text"
                        placeholder="Enter Slider Text"
                        name="SliderContent"
                        value={formdata.SliderContent}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="update-btn" onClick={handleUpdate}>Update</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
                </div>
            </form>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center"
                    >
                        {/* Image + Content */}
                        <div className="flex items-center gap-4 flex-1">
                            <img
                                src={`http://localhost:5000/uploads/${item.SliderImage}`}
                                alt="slider"
                                className="w-90 h-50 object-cover rounded-xl border mb-4"
                            />

                            <p className="text-gray-800 font-semibold text-lg">
                                {item.SliderContent}
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => handleSelect(item)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Slider;