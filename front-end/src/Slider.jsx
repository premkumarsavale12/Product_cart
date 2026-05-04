import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Slider.css";

const Slider = () => {

    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const fetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/slider/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchApiData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) =>
                    prev === data.length - 1 ? 0 : prev + 1
                );
                setIsFading(false);
            }, 400);
        }, 3000);

        return () => clearInterval(interval);
    }, [data]);

    if (data.length === 0) return <h3>Loading...</h3>;

    return (
        <div className="slider-container">
            <div className="slider-box">
                <img
                    src={`http://localhost:5000/uploads/${data[currentIndex]?.SliderImage}`}
                    alt="slider"
                    className={`slider-image ${isFading ? 'fade-out' : ''}`}
                />
            </div>

            <div className="dots">
                {data.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;