import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Product.css"
import { useCart } from './context/CartContext'
import { useWishlist } from './context/WishlistContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Swal from "sweetalert2";


const Product = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/product/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (product) => {
        addToCart({
            _id: product._id,
            name: product.ProductName,
            price: product.ProductPrice,
            image: product.ProductImage
                ? `http://localhost:5000/uploads/${product.ProductImage}`
                : "https://via.placeholder.com/400x300?text=No+Image"
        });

        Swal.fire({
            icon: "success",
            title: "Added to Cart",
            text: `${product.ProductName || "Product"} added successfully!`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const renderStars = (rating) => {
        const validRating = rating || 4; // Default to 4 stars if no rating provided
        return (
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span key={index} style={{ color: index < validRating ? "#FFD700" : "#e4e5e9", fontSize: "1.2rem", marginRight: "2px" }}>
                        ★
                    </span>
                ))}
            </div>
        )
    }

    const groupedProducts = useMemo(() => {
        const filteredData = data.filter(item =>
            item.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filteredData.reduce((acc, product) => {
            const category = product.category || "Uncategorized";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    }, [data, searchTerm]);

    return (
        <div className="product-page">
            <h1>Products</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {Object.keys(groupedProducts).length > 0 ? (
                Object.entries(groupedProducts).map(([category, products]) => (
                    <div key={category} className="category-section">
                        <h2 className="category-title">{category}</h2>
                        <div className="product-list">
                            {products.map((item, index) => (
                                <div className="product-card" key={item._id || index}>
                                    <div className="relative">
                                        <img
                                            src={item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : "https://via.placeholder.com/400x300?text=No+Image"}
                                            alt={item.ProductName || "Product"}
                                            loading="lazy"
                                            className="product-image"
                                        />
                                        <button
                                            className="wishlist-btn-overlay"
                                            onClick={() => toggleWishlist({
                                                _id: item._id,
                                                ProductName: item.ProductName,
                                                ProductPrice: item.ProductPrice,
                                                ProductImage: item.ProductImage
                                            })}
                                        >
                                            {isInWishlist(item._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    <div className="product-details">
                                        <h4>{item.ProductName}</h4>
                                        {renderStars(item.rating)}
                                        <h3>Price: {item.ProductPrice}</h3>
                                        <h5>Quantity: {item.Productquantity}</h5>
                                        <div className="product-actions">
                                            <button className='btn buy-btn' onClick={() => navigate(`/product/${item._id}`)}> {item.Button || "Buy Now"}</button>
                                            <button className='btn cart-btn' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-products">No products found</p>
            )}
        </div>
    )
}

export default Product;
