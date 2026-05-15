import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Heading Area */}
                <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-8 bg-red-500 rounded-sm inline-block"></span>
                            <p className="text-red-500 font-bold tracking-wider uppercase text-sm">Today's</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Flash Sales</h2>
                    </div>
                </div>
                <style>
                    {`
                        .swiper-button-next, .swiper-button-prev {
                            color: #ef4444; /* red-500 */
                            background: white;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                            margin: 0 -15px;
                        }
                        .swiper-button-next::after, .swiper-button-prev::after {
                            font-size: 16px !important;
                            font-weight: 900;
                        }
                        .swiper-button-disabled {
                            opacity: 0.5 !important;
                        }
                    `}
                </style>

                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={4}
                    navigation
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 16 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 24 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className="!pb-16"
                >
                    {data.map((item, index) => {

                        let discountPercent = "-25%";
                        if (item.old_price && item.price && item.old_price > item.price) {
                            const discount = Math.round(((item.old_price - item.price) / item.old_price) * 100);
                            discountPercent = `-${discount}%`;
                        }

                        return (
                            <SwiperSlide key={index} className="h-auto">
                                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden relative">

                                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center">

                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 shadow-sm">
                                            {discountPercent}
                                        </span>

                                        <img
                                            src={
                                                item.image
                                                    ? `http://localhost:5000/uploads/${item.image}`
                                                    : "https://via.placeholder.com/300x200"
                                            }
                                            alt={item.product_name}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">

                                        {item.sale_name && (
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">
                                                {item.sale_name}
                                            </p>
                                        )}

                                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                                            {item.product_name || "Awesome Product"}
                                        </h3>

                                        <div className="mt-auto pt-2 flex items-baseline gap-3 mb-4">
                                            <span className="text-red-500 font-extrabold text-xl">
                                                ₹{item.price}
                                            </span>
                                            {item.old_price && (
                                                <span className="line-through text-gray-400 font-medium text-sm">
                                                    ₹{item.old_price}
                                                </span>
                                            )}
                                        </div>

                                        <button className="w-full bg-black text-white font-medium py-2.5 rounded-xl opacity-90 hover:opacity-100 hover:bg-gray-900 transform active:scale-95 transition-all duration-200 shadow-md">
                                            {item.Button || "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    );
};
export default Latest_Sales;