import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutHero = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/about/all"
            );

            console.log(res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-[#f5f5f5] py-16 px-6 md:px-16">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
                            {item.heading}
                        </h1>

                        <p className="text-gray-700 leading-8 text-lg mb-6">
                            {item.Description}
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center">
                        <img
                            src={item.Image ? `http://localhost:5000/uploads/${item.Image}` : 'https://via.placeholder.com/600x450?text=No+Image'}
                            //   image: item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : 'https://via.placeholder.com/600x450?text=No+Image'
                            alt={item.heading}
                            className="w-full max-w-xl h-[500px] object-cover rounded-sm shadow-lg"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutHero;