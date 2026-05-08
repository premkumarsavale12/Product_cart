import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AboutMiddle.css';

const About_Middle = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/aboutmiddle/all");
            setData(res.data);
         
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="about-container">
            {
                data.map((item, index) => (
                    <div
                        className={`about-card ${index === 1 ? "active-card" : ""}`}
                        key={index}
                    >

                        <div className="icon-box">
                            <img
                                src={
                                    item.Icon
                                        ? `http://localhost:5000/uploads/${item.Icon}`
                                        : 'https://via.placeholder.com/60'
                                }
                                alt=""
                                className="icon-image"
                            />
                        </div>

                        <h1>{item.Number}</h1>
                        <h4>{item.Data}</h4>

                    </div>
                ))
            }
        </div>
    );
};

export default About_Middle;