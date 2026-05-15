import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Category() {
    const [data, setData] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/category/all"
            );
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-8 bg-red-500 rounded-sm"></span>

                            <p className="text-red-500 font-bold uppercase tracking-wider text-sm">
                                Today's
                            </p>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            Browse By Category
                        </h2>
                    </div>

                    {/* Custom Buttons */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
                        >
                            <FaArrowLeft />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
                        >
                            <FaArrowRight />
                        </button>

                    </div>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={24}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="!pb-14"
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index} className="h-auto">

                            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">

                                {/* Image */}
                                <div className="bg-gray-50 p-6 flex items-center justify-center overflow-hidden">

                                    <img
                                        src={
                                            item.Icon
                                                ? `http://localhost:5000/uploads/${item.Icon}`
                                                : "https://via.placeholder.com/300x200"
                                        }
                                        alt={item.Name}
                                        className="w-[120px] h-[120px] object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 text-center">

                                    {item.Heading && (
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
                                            {item.Heading}
                                        </p>
                                    )}

                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300">
                                        {item.Name}
                                    </h3>

                                </div>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}