
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

            <form
                className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 items-start"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Enter Heading"
                    name="Heading"
                    onChange={handleChange}
                    value={formdata.Heading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                <div className="flex flex-col">
                    <input
                        type="file"
                        accept="image/*"
                        name="Icon"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />

                    {formdata.Icon && typeof formdata.Icon === 'string' && (
                        <img
                            src={`http://localhost:5000/uploads/${formdata.Icon}`}
                            alt="Selected Product Image"
                            className="w-full h-32 object-contain rounded-xl mt-2"
                        />
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Enter Name "
                    name="Name"
                    onChange={handleChange}
                    value={formdata.Name}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />

                <div className="md:col-span-3 flex flex-wrap gap-4 justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Clear
                    </button>
                </div>
            </form>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center"
                    >
                        <img
                            src={`http://localhost:5000/uploads/${item.Icon}`}
                            alt={item.Heading}
                            className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <p className="text-gray-500 text-sm">
                            ₹{item.Name}
                        </p>
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