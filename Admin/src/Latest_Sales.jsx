
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios"

const Latest_Sales = () => {

    const [formdata, setFormData] = useState({
        sale_name: "",
        time: "",
        image: "",
        product_name: "",
        price: "",
        old_price: "",
        Button: "",

    })
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("sale_name", formdata.sale_name);
            data.append("time", formdata.time);
            data.append("image", formdata.image);
            data.append("product_name", formdata.product_name);
            data.append("price", formdata.price);
            data.append("old_price", formdata.old_price);
            data.append("Button", formdata.Button);

            const res = await axios.post(
                "http://localhost:5000/api/discount/add", data
            );
            alert("Data Submitted SuccessFully...");
        }

        catch (err) {
            console.log(err.response?.data || err.message);
        }

    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "image" ? files[0] : value,
        });
    };

    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First....");
            return;
        }

        try {
            const updateData = new FormData();

            updateData.append("sale_name", formdata.sale_name);
            updateData.append("time", formdata.time);
            updateData.append("image", formdata.image);
            updateData.append("product_name", formdata.product_name);
            updateData.append("price", formdata.price);
            updateData.append("old_price", formdata.old_price);
            updateData.append("Button", formdata.Button);

            if (formdata.image) {
                updateData.append("image", formdata.image);
            }

            await axios.put(
                `http://localhost:5000/api/discount/${selectedId}`,
                updateData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Updated SuccessFully....");
            FetchApiData();
            handleClear();
        }

        catch (err) {

            alert("Error Updating data...");

        }
    }
    const handleDelete = async () => {

        if (!selectedId) {
            alert("Please select a record first....");
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/discount/${selectedId}`);
            alert("Deleted SuccessFully....");
            handleClear();
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleClear = () => {
        setFormData({
            sale_name: "",
            time: "",
            image: "null",
            product_name: "",
            price: "",
            old_price: "",
            Button: "",
        })

    }
    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/discount/all");
            setData(res.data);


        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSelect = (item) => {

        setFormData({

            sale_name: item.sale_name,
            time: item.time,
            image: item.image,
            product_name: item.product_name,
            price: item.price,
            old_price: item.old_price,
            Button: item.Button

        });
        setSelectedId(item._id || item.id);
    }

    return (
        <div className="product-container">
            <h1 className="title">Latest Sales  Page </h1>

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Sale Name"
                    name="sale_name"
                    onChange={handleChange}
                    value={formdata.sale_name}

                />

                <input
                    type="number"
                    placeholder="Enter Time "
                    name="time"
                    onChange={handleChange}
                    value={formdata.time}

                />
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                />
                {formdata.image && typeof formdata.image === 'string' && (
                    <img
                        src={`http://localhost:5000/uploads/${formdata.image}`}
                        alt="Selected Product Image"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                    />
                )}

                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="product_name"
                    onChange={handleChange}
                    value={formdata.product_name}
                    required
                />
                <input
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    onChange={handleChange}
                    value={formdata.price}
                    required
                />

                <input
                    type="number"
                    placeholder="Enter Old Price "
                    name="old_price"
                    onChange={handleChange}
                    value={formdata.old_price}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter Button Name"
                    name="Button"
                    onChange={handleChange}
                    value={formdata.Button}
                    required
                />

                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="update-btn" onClick={handleUpdate}>Update</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
                </div>

            </form>

            <div className="data-list">

                {data.map((item, index) => (

                    <div className="data-row" key={index}>

                        <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.Name}
                            className="slider-img"
                            width="100"
                        />
                        <p className="slider-text">
                            {item.Name}
                        </p>
                        <p className="slider-price">
                            ₹{item.price}
                        </p>
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
}
export default Latest_Sales