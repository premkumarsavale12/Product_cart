import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import './Product.css';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProductFilter = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const nameMatch = item.ProductName?.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory
                ? item.category?.toLowerCase().includes(selectedCategory.toLowerCase())
                : true;
            const priceValue = Number(String(item.ProductPrice).replace(/[^0-9.-]/g, ''));
            const priceMatch = selectedPrice
                ? selectedPrice === 'low'
                    ? priceValue < 400
                    : selectedPrice === 'mid'
                        ? priceValue >= 400 && priceValue <= 700
                        : priceValue > 700
                : true;

            return nameMatch && categoryMatch && priceMatch;
        });
    }, [products, searchTerm, selectedCategory, selectedPrice]);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(products.map((item) => item.category).filter(Boolean)));
        return unique.length > 0 ? unique : ["Acne", "Dry", "Pigmentation", "Odor"];
    }, [products]);

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedPrice("");
        setSearchTerm("");
    };


    const handleAddToCart = (item) => {
        addToCart({
            _id: item._id,
            name: item.ProductName,
            price: item.ProductPrice,
            image: item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : 'https://via.placeholder.com/600x450?text=No+Image'
        });

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${item.ProductName || 'Product'} added successfully!`,
            showConfirmButton: false,
            timer: 1400
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (id) {
                    const res = await axios.get(`http://localhost:5000/api/product/${id}`);
                    setProduct(res.data);
                } else {
                    const res = await axios.get('http://localhost:5000/api/product/all');
                    setProducts(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const groupedProducts = useMemo(() => {
        return filteredProducts.reduce((acc, product) => {
            const category = product.category || 'Uncategorized';
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        }, {});
    }, [filteredProducts]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div> Loading...
            </div>
        );
    }

    if (id) {
        if (!product) {
            return <div className="error-container">Product not found.</div>;
        }

        return (
            <div className="product-details-container">

                <button className="back-button" onClick={() => navigate(-1)}>
                    &larr; Back to Products
                </button>
                <div className="product-details-content">
                    <div className="product-details-left">
                        <img
                            src={product.ProductImage ? `http://localhost:5000/uploads/${product.ProductImage}` : 'https://via.placeholder.com/600x450?text=No+Image'}
                            alt={product.ProductName || 'Product'}
                            className="details-image"
                        />
                    </div>
                    <div className="product-details-right">
                        <span className="category-badge">{product.category || 'Uncategorized'}</span>
                        <h1 className="product-title">{product.ProductName}</h1>
                        <h2 className="product-price">Price: {product.ProductPrice}</h2>
                        <h4 className="product-quantity">In Stock: {product.Productquantity}</h4>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>
                                Experience the premium quality of {product.ProductName}.
                                This product is specially crafted for those who value excellence and reliability.
                                Add it to your collection today and enjoy its remarkable features.
                            </p>
                        </div>

                        <div className="details-actions">
                            <button className="buy-now-btn">{product.Button || 'Buy Now'}</button>
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
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
            </div>
        );
    }

    return (
        <div className="product-page">
            <h1>Product Filter</h1>
            <div className="product-page-grid md:flex md:gap-6">
                <aside className="w-full md:w-1/4 p-6 bg-gray-50 md:border border-gray-200 rounded-md mb-6 md:mb-0">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Filters</h3>
                        {(selectedCategory || selectedPrice || searchTerm) && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-red-500 hover:text-red-700 font-medium underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                    <div className="mb-8">
                        <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4 font-sans">
                            Product
                        </h4>
                        {categories.map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center gap-3 text-sm mb-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                                    onChange={() => setSelectedCategory(cat.toLowerCase())}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <span className="group-hover:text-black transition-colors">
                                    {cat}
                                </span>
                            </label>
                        ))}
                        {categories.length > 0 && (
                            <button
                                onClick={() => setSelectedCategory("")}
                                className="text-xs text-gray-600 hover:text-gray-900 font-medium underline"
                            >
                                Clear category
                            </button>
                        )}
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4 font-sans">
                            Price Range
                        </h4>
                        {[
                            { label: "Under ₹400", value: "low" },
                            { label: "₹400 - ₹700", value: "mid" },
                            { label: "Above ₹700", value: "high" },
                        ].map((range) => (
                            <label
                                key={range.value}
                                className="flex items-center gap-3 text-sm mb-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    checked={selectedPrice === range.value}
                                    onChange={() => setSelectedPrice(range.value)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <span className="group-hover:text-black transition-colors">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                        <button
                            onClick={() => setSelectedPrice("")}
                            className="text-xs text-gray-600 hover:text-gray-900 font-medium underline mt-2 block"
                        >
                            Clear price range
                        </button>
                    </div>
                </aside>

                <main className="w-full md:w-3/4">
                    <div className="search-container mb-6">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input w-full"
                        />
                    </div>
                    {Object.keys(groupedProducts).length > 0 ? (
                        Object.entries(groupedProducts).map(([category, items]) => (
                            <div key={category} className="category-section mb-8">
                                <h2 className="category-title">{category}</h2>
                                <div className="product-list">
                                    {items.map((item) => (
                                        <div className="product-card" key={item._id}>
                                            <div className="relative">
                                                <img
                                                    src={item.ProductImage ? `http://localhost:5000/uploads/${item.ProductImage}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                                                    alt={item.ProductName || 'Product'}
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
                                                <h3>Price: {item.ProductPrice}</h3>
                                                <h5>Quantity: {item.Productquantity}</h5>
                                                <div className="product-actions">
                                                    <button className="btn buy-btn" onClick={() => navigate(`/productfilter/${item._id}`)}>
                                                        {item.Button || 'View Details'}
                                                    </button>
                                                    <button className="btn cart-btn" onClick={() => handleAddToCart(item)}>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-products">No products found.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductFilter;


