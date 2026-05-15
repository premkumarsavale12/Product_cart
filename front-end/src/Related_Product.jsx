import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Related_Product = ({ category, currentId }) => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/product/all");


            const filtered = res.data.filter(
                (item) =>
                    item.category === category && item._id !== currentId
            );

            setData(filtered);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6">

            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div 
                            onClick={()=> navigate(`/product/${item._id}`)} 
                            
                            className="border rounded-lg shadow-md p-4 bg-white">


                                <img
                                    src={
                                        item.ProductImage
                                            ? `http://localhost:5000/uploads/${item.ProductImage}`
                                            : "https://via.placeholder.com/300"
                                    }
                                    alt=""
                                    className="w-full h-40 object-contain mb-3"
                                />

                                <h3 className="text-sm font-semibold">
                                    {item.ProductName}
                                </h3>

                                <h4 className="text-orange-500 font-bold">
                                    ${item.ProductPrice}
                                </h4>

                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </div>
    )
}
export default Related_Product;