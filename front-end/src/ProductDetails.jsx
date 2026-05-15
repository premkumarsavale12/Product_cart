import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Related_Product from './Related_Product';
import { loadStripe } from "@stripe/stripe-js";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomStyle, setZoomStyle] = useState({});
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const makePayment = async () => {
        debugger;
        const stripe = await loadStripe("pk_test_51TWukoPagvMIvM7nnu5763iHx9tFjEzH9nR4hG6mUcApSwaYSjtedEQhVco1fVkZzZcOVHE9AjWRIprABlpkGjWw00erTDaXQo");

        const body = {
            products: [{
                _id: product._id,
                name: product.ProductName,
                price: product.ProductPrice,
                image: product.ProductImage
                    ? `http://localhost:5000/uploads/${product.ProductImage}`
                    : "https://via.placeholder.com/600x450?text=No+Image",
                quantity: 1
            }],
        };
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                console.error("Payment session creation failed");
                return;
            }

            const session = await response.json();

            if (session.url) {
                window.location.href = session.url;
            } else {
                console.error("No checkout URL returned from server");
            }
        } catch (error) {
            console.error("Error connecting to payment gateway:", error);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            name: product.ProductName,
            price: product.ProductPrice,
            image: product.ProductImage
                ? `http://localhost:5000/uploads/${product.ProductImage}`
                : "https://via.placeholder.com/600x450?text=No+Image"
        });
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(2)"
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({
            transform: "scale(1)",
            transformOrigin: "center"
        });
    };

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
            <div className="flex justify-center items-center h-[60vh] text-lg font-semibold">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center text-red-500 mt-10">
                Product not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">

            <button
                onClick={() => navigate("/")}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Back to Products
            </button>

            <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow">
                <div
                    className="overflow-hidden rounded-lg cursor-zoom-in border"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={
                            product.ProductImage
                                ? `http://localhost:5000/uploads/${product.ProductImage}`
                                : "https://via.placeholder.com/600x450?text=No+Image"
                        }
                        alt={product.ProductName}
                        className="w-full h-[400px] object-cover transition-transform duration-300"
                        style={zoomStyle}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-sm bg-gray-200 px-3 py-1 w-fit rounded-full">
                        {product.category || "Uncategorized"}
                    </span>

                    <h1 className="text-2xl font-bold">
                        {product.ProductName}
                    </h1>

                    <h2 className="text-xl text-green-600 font-semibold">
                        ₹ {product.ProductPrice}
                    </h2>

                    <p className="text-gray-600">
                        In Stock: {product.Productquantity}
                    </p>

                    <div>
                        <h3 className="font-semibold text-lg mb-1">Description</h3>
                        <p className="text-gray-700 text-sm">
                            Experience the premium quality of {product.ProductName}.
                            This product is crafted for performance and durability.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">

                        <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                            onClick={makePayment}
                        >
                            {product.Button || "Buy Now"}
                        </button>

                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>

                        <button
                            onClick={() =>
                                toggleWishlist({
                                    _id: product._id,
                                    ProductName: product.ProductName,
                                    ProductPrice: product.ProductPrice,
                                    ProductImage: product.ProductImage
                                })
                            }
                            className={`flex items-center gap-2 px-5 py-2 rounded border 
                            ${isInWishlist(product._id)
                                    ? "bg-red-500 text-white"
                                    : "bg-white text-black"
                                }`}
                        >
                            {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
                            {isInWishlist(product._id)
                                ? "In Wishlist"
                                : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <Related_Product
                    category={product.category}
                    currentId={product._id}
                />
            </div>
        </div>
    );
};

export default ProductDetails;