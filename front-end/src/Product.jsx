

import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Product.css"

const Product = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        FetchApiData();

    }, []);

    const FetchApiData = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/product/all");
            console.log(res.data);
            setData(res.data);

        }

        catch (err) {
            console.log(err);

        }
    }

    return (
        <div className="product-page">
            <h1>Products</h1>

            <div className="product-list">
                {data.map((item, index) => (
                    <div className="product-card" key={item._id || index}>
                        <img
                            src={item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : "https://via.placeholder.com/400x300?text=No+Image"}
                            alt={item.ProductName || "Product"}
                            className="product-image"
                        />
                        <div className="product-details">
                            <h4>{item.ProductName}</h4>
                            <p>Price: {item.ProductPrice}</p>
                            <p>Quantity: {item.Productquantity}</p>
                            <button className='btn'> {item.Button}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;
