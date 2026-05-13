import React, { useEffect, useState } from "react";
import axios from "axios";

const Selling_Product = () => {

    const [formdata, setFormdata] = useState({
        Image: null,
        Name: "",
        Price: "",
        Old_Price: "",
    });

    const [previewImage, setPreviewImage] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const form = new FormData();

            form.append("Image", formdata.Image);
            form.append("Name", formdata.Name);
            form.append("Price", formdata.Price);
            form.append("Old_Price", formdata.Old_Price);

            await axios.post(
                "http://localhost:5000/api/selling_product/add",
                form,
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
            console.log(err.response?.data || err.message);
        }
    };


    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "Image") {

            setFormdata({
                ...formdata,
                Image: files[0],
            });

            // Preview selected image
            setPreviewImage(URL.createObjectURL(files[0]));

        } else {

            setFormdata({
                ...formdata,
                [name]: value,
            });
        }
    };



    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please select a record first");
            return;
        }

        try {

            const updatedData = new FormData();

            updatedData.append("Name", formdata.Name);
            updatedData.append("Price", formdata.Price);
            updatedData.append("Old_Price", formdata.Old_Price);

            // Only append image if new image selected
            if (formdata.Image) {
                updatedData.append("Image", formdata.Image);
            }

            await axios.put(
                `http://localhost:5000/api/selling_product/${selectedId}`,
                updatedData,
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

            console.log(err);
            alert("Error updating data");

        }
    };



    const handleDelete = async () => {

        if (!selectedId) {
            alert("Please select a record first");
            return;
        }

        try {

            await axios.delete(
                `http://localhost:5000/api/selling_product/${selectedId}`
            );

            alert("Deleted Successfully");

            FetchApiData();
            handleClear();

        } catch (err) {

            console.log(err);

        }
    };


    const handleClear = () => {

        setFormdata({
            Image: null,
            Name: "",
            Price: "",
            Old_Price: "",
        });

        setPreviewImage("");
        setSelectedId(null);
    };



    const handleSelect = (item) => {

        console.log(item);

        setFormdata({
            Image: null, // cannot set old file in file input
            Name: item.Name || "",
            Price: item.Price || "",
            Old_Price: item.Old_Price || "",
        });

        // Show old image preview
        setPreviewImage(item.Image);

        setSelectedId(item._id || item.id);
    };

  

    const FetchApiData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/selling_product/all"
            );

            setData(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div className="product-container">

            <h1 className="title">Selling Product Page</h1>

            <form className="product-form" onSubmit={handleSubmit}>

                {/* NAME */}

                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="Name"
                    value={formdata.Name}
                    onChange={handleChange}
                    required
                />

                {/* PRICE */}

                <input
                    type="number"
                    placeholder="Enter Product Price"
                    name="Price"
                    value={formdata.Price}
                    onChange={handleChange}
                    required
                />

                {/* IMAGE */}

                <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={handleChange}
                />

                {/* IMAGE PREVIEW */}

                {previewImage && (

                    <img
                        src={
                            formdata.Image
                                ? previewImage
                                : `http://localhost:5000/uploads/${previewImage}`
                        }
                        alt="preview"
                        width="120"
                        height="120"
                        style={{
                            objectFit: "cover",
                            marginTop: "10px",
                            borderRadius: "10px",
                        }}
                    />
                )}

                {/* OLD PRICE */}

                <input
                    type="number"
                    placeholder="Enter Old Price"
                    name="Old_Price"
                    value={formdata.Old_Price}
                    onChange={handleChange}
                    required
                />

                {/* BUTTONS */}

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

            {/* DATA LIST */}

            <div className="data-list">

                {data.map((item, index) => (

                    <div className="data-row" key={index}>

                        <img
                            src={`http://localhost:5000/uploads/${item.Image}`}
                            alt={item.Name}
                            className="slider-img"
                            width="100"
                        />

                        <p className="slider-text">{item.Name}</p>

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

export default Selling_Product;