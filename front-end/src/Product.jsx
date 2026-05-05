import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Product.css"

const Product = () => {

    const [data, setData] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() => {

        FetchApiData();

    }, []);

    const FetchApiData = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/product/all");
            console.log(res.data);
            setData(res.data);

            const grouped = res.data.reduce((acc, product) => {
                const category = product.category || "Uncategorized";
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(product);
                return acc;
            }, {});

            setGroupedProducts(grouped);
        }

        catch (err) {
            console.log(err);

        }
    }

    return (
        <div className="product-page">
            <h1>Products</h1>

            {Object.keys(groupedProducts).length > 0 ? (
                Object.entries(groupedProducts).map(([category, products]) => (
                    <div key={category} className="category-section">
                        <h2 className="category-title">{category}</h2>
                        <div className="product-list">
                            {products.map((item, index) => (
                                <div className="product-card" key={item._id || index}>
                                    <img
                                        src={item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={item.ProductName || "Product"}
                                        className="product-image"
                                    />
                                    <div className="product-details">
                                        <h4>{item.ProductName}</h4>
                                        <h3>Price: {item.ProductPrice}</h3>
                                        <h5>Quantity: {item.Productquantity}</h5>
                                        <button className='btn'> {item.Button}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    )
}

export default Product;
