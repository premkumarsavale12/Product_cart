
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Category = () => {

    const [formdata, setFormData] = useState({
        Heading: "",
        Icon: "",
        Name: "",

    })

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("Heading", formdata.Heading);
        data.append("Icon", formdata.Icon);
        data.append("Name", formdata.Name);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/category/add",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(res.data);
            alert("Data Added Successfully....");
        }
        catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formdata,
            [name]: name === "Icon" ? files[0] : value,
        });
    };


    const handleUpdate = async () => {

        if (!selectedId) {
            alert("Please Select a record First....");
            return;
        }

        try {


            const updateData = new FormData();
            updateData.append("Heading", formdata.Heading);
            updateData.append("Icon", formdata.Icon);
            updateData.append("Name", formdata.Name);


            if (formdata.Icon) {
                updateData.append("Icon", formdata.Icon);
            }


            await axios.put(
                `http://localhost:5000/api/category/${selectedId}`,
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
            await axios.delete(`http://localhost:5000/api/category/${selectedId}`);
            alert("Deleted SuccessFully....");
            handleClear();
        }
        catch (err) {
            console.log(err);
        }
    }


    const handleClear = () => {

        setFormData({

            Heading: "",
            Icon: "",
            Name: "",

        })

    }
    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/category/all");
            setData(res.data);


        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSelect = (item) => {


        setFormData({

            Icon: item.Icon,
            Heading: item.Heading,
            Name: item.Name

        });
        setSelectedId(item._id || item.id);
    }

    return (
        <div className="product-container">
            <h1 className="title"> Category Page  </h1>

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Heading"
                    name="Heading"
                    onChange={handleChange}
                    value={formdata.Heading}

                />
                <input
                    type="file"
                    accept="image/*"
                    name="Icon"
                    onChange={handleChange}
                />

                {formdata.Icon && typeof formdata.Icon === 'string' && (
                    <img
                        src={`http://localhost:5000/uploads/${formdata.Icon}`}
                        alt="Selected Product Image"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
                    />
                )}

                <input
                    type="text"
                    placeholder="Enter Name "
                    name="Name"
                    onChange={handleChange}
                    value={formdata.Name}
                    required
                />

                <div className="button-group">
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
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
                        {/* Image + Text */}

                        <img
                            src={`http://localhost:5000/uploads/${item.Icon}`}
                            alt={item.Heading}
                            className="w-24 h-24 object-cover rounded-lg border"
                        />



                        <p className="text-gray-500 text-sm">
                            ₹{item.Name}
                        </p>



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

}

export default Category