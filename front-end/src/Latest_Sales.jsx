import React, { useEffect, useState } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Autoplay, Pagination } from "swiper/modules";

const Latest_Sales = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/discount/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-gray-100 py-10 px-6">

            {/* Heading */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <p className="text-red-500 font-semibold">Today's</p>
                    <h2 className="text-3xl font-bold">Flash Sales</h2>
                </div>
            </div>

            {/* Slider */}
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                className="!pb-12" // space for dots
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 h-full flex flex-col">

                            {/* Sale Name */}
                            <h2 className="text-lg font-bold mb-2 text-center">
                                {item.sale_name}
                            </h2>

                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={
                                        item.image
                                            ? `http://localhost:5000/uploads/${item.image}`
                                            : "https://via.placeholder.com/300x200"
                                    }
                                    alt=""
                                    className="w-full h-40 object-cover rounded-lg"
                                />

                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    -25%
                                </span>
                            </div>

                            {/* Product */}
                            <h3 className="mt-3 font-semibold text-md">
                                {item.product_name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-red-500 font-bold text-lg">
                                    ₹{item.price}
                                </span>
                                <span className="line-through text-gray-400 text-sm">
                                    ₹{item.old_price}
                                </span>
                            </div>

                            {/* Button */}
                            <button className="mt-auto w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                                {item.Button || "Buy Now"}
                            </button>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Latest_Sales;