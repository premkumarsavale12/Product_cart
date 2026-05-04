import React, { useState } from 'react';
import './Slider.css';
import axios from 'axios';

const Slider = () => {

    const [formdata, setFormData] = useState({
        SliderImage: "",
        SliderContent: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "SliderImage" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        debugger;

        e.preventDefault();
        try {

            const data = new FormData();

            data.append("SliderImage", formdata.SliderImage);
            data.append("SliderContent", formdata.SliderContent);

            const res = await axios.post("http://localhost:5000/api/slider/add", data);
            console.log(res.data);
            alert("Data Submitted SuccessFully....");
        }

        catch (err) {
            console.log(err.response?.data || err.message);

        }
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
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Slider Text</label>
                    <input
                        type="text"
                        placeholder="Enter Slider Text"
                        name="SliderContent"
                        value={formdata.SliderContent}
                        onChange={handleChange}
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="update-btn">Update</button>
                    <button type="button" className="delete-btn">Delete</button>
                    <button type="button" className="clear-btn">Clear</button>
                </div>
            </form>
        </div>
    );
};

export default Slider;