import React, { useEffect, useState } from "react";
import axios from "axios";

const Founder = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/founder/all"
            );

            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full bg-white py-12 px-6">
            {/* Container */}
            <div className="max-w-7xl mx-auto">

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white text-center rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6"
                        >
                            {/* Image */}
                            <div className="w-full h-[320px] overflow-hidden rounded-md bg-gray-100">
                                <img
                                    src={
                                        item.Image
                                            ? `http://localhost:5000/uploads/${item.Image}`
                                            : "https://via.placeholder.com/300"
                                    }
                                    alt={item.Name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-5">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {item.Name}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    {item.Role}
                                </p>

                                {/* Social Icons */}
                                <div className="flex justify-center gap-4 mt-4 text-gray-500">
                                    <a
                                        href={item.twitter || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-blue-500"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>

                                    <a
                                        href={item.instagram || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-pink-500"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>

                                    <a
                                        href={item.linkedin || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-blue-700"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Founder;