
import React from 'react'
import { useState } from 'react';

const Founder_Section = () => {

    const [formdata, setFormData] = useState({

        Image: "",
        Name: "",
        Role: "",

    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "Image" ? files[0] : value,
        });
    };

    const handleSubmit = () => {


    }

    const handleUpdate = () => {


    }

    const handleDelete = () => {


    }


    const handleClear = () => {


    }

    return (
        <div className="product-container">

            <h1 className="title">Founder Details Page </h1>

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Enter  Name"
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

                {/* {formdata.ProductImage && typeof formdata.ProductImage === 'string' && (
                    <img
                        src={`http://localhost:5000/uploads/${formdata.ProductImage}`}
                        alt="Selected Product Image"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                    />
                )} */}


                {/* <button type="submit">Submit Product</button> */}

                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="update-btn" onClick={handleUpdate}>Update</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
                </div>

            </form>



        </div>
    );
}


export default Founder_Section