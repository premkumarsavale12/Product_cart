import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Related_Product from './Related_Product';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            name: product.ProductName,
            price: product.ProductPrice,
            image: product.ProductImage ? `http://localhost:5000/uploads/${product.ProductImage}` : "https://via.placeholder.com/600x450?text=No+Image"
        });
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div> Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="error-container">
                Product not found.
            </div>
        );
    }

    return (
        <div className="product-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                &larr; Back to Products
            </button>
            <div className="product-details-content">
                <div className="product-details-left">
                    <img
                        src={product.ProductImage ? `http://localhost:5000/uploads/${product.ProductImage}` : "https://via.placeholder.com/600x450?text=No+Image"}
                        alt={product.ProductName || "Product"}
                        loading="lazy"
                        className="details-image"
                    />
                </div>
                <div className="product-details-right">
                    <span className="category-badge">{product.category || "Uncategorized"}</span>
                    <h1 className="product-title">{product.ProductName}</h1>
                    <h2 className="product-price">Price: {product.ProductPrice}</h2>
                    <h4 className="product-quantity">In Stock: {product.Productquantity}</h4>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>
                            Experience the premium quality of {product.ProductName}.
                            This product is specially crafted for those who value excellence and
                            reliability. Add it to your collection today and enjoy its remarkable features.
                        </p>
                    </div>

                    <div className="details-actions">
                        <button className="buy-now-btn">{product.Button || "Buy Now"}</button>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button
                            className={`details-wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
                            onClick={() => toggleWishlist({
                                _id: product._id,
                                ProductName: product.ProductName,
                                ProductPrice: product.ProductPrice,
                                ProductImage: product.ProductImage
                            })}
                        >
                            {isInWishlist(product._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            {isInWishlist(product._id) ? ' In Wishlist' : ' Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
             <Related_Product />
              
        </div>
    );
};

export default ProductDetails;
