import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const Selling_Product = () => {

    const [formdata, setFormdata] = useState({

        Image: "",
        Name: "",
        Price: "",
        Old_Price: "",
    })

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);


    const handleSubmit = async (e) => {

        debugger;

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("Image", formdata.Image);
            data.append("Name", formdata.Name);
            data.append("Price", formdata.Price);
            data.append("Old_Price", formdata.Old_Price)

            const res = await axios.post("http://localhost:5000/api/selling_product/add", data);
            alert("Data Submitted SuccessFully...");
        }
        catch (err) {
            console.log(err.response?.data || err.message);

        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormdata({
            ...formdata,
            [name]: name === "Image" ? files[0] : value,
        });
    }


    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First....");
            return;
        }

        try {
            const updatedData = new FormData();

            updatedData.append("Image", formdata.Image);
            updatedData.append("Name", formdata.Name);
            updatedData.append("Price", formdata.Price)
            updatedData.append("Old_Price", formdata.Old_Price);


            if (formdata.Image) {
                updatedData.append("image", formdata.Image);
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

            await axios.delete(`http://localhost:5000/api/selling_product/${selectedId}`);
            alert("Deleted SuccessFully....");
            handleClear();
        }
        catch (err) {
            console.log(err);

        }

    }

    const handleClear = () => {
        setFormdata({

            Image: "null",
            Name: "",
            Price: "",
            Old_Price: "",
        })

    }

    const handleSelect = (item) => {
        console.log("item", item);

        debugger;

        setFormdata({

            Image: item.Image,
            Name: item.Name,
            Price: item.Price,
            Old_Price: item.Old_Price
        })



        setSelectedId(item._id || item.id);
    }



    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/selling_product/all");
            setData(res.data);
            console.log(res.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="product-container">

            <h1 className="title"> Selling Product Page </h1>

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Product  Name"
                    name="Name"
                    onChange={handleChange}
                    value={formdata.Name}

                />

                <input
                    type="number"
                    placeholder="Enter Product  Price "
                    name="Price"
                    onChange={handleChange}
                    value={formdata.Price}

                />
                <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Enter product  Old_Price"
                    name="Old_Price"
                    onChange={handleChange}
                    value={formdata.Old_Price}
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
                            src={`http://localhost:5000/uploads/${item.Image}`}
                            className="slider-img"
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
}


export default Selling_Product;