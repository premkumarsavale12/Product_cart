import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { FaSearch, FaTimes, FaRegStar, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useWishlist } from './context/WishlistContext';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    
    let totalWishlistCount = 0;
    try {
        const wishlistContext = useWishlist();
        if (wishlistContext) {
            totalWishlistCount = wishlistContext.totalWishlistCount || 0;
        }
    } catch (e) {
        // Safe fallback if context is missing
    }

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = cart.reduce((acc, item) => acc + (item.cartQuantity || 1), 0);
            setTotalCount(count);
        };
        
        updateCartCount();
        
        window.addEventListener('storage', updateCartCount);
        const interval = setInterval(updateCartCount, 1000);
        
        return () => {
            window.removeEventListener('storage', updateCartCount);
            clearInterval(interval);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {isSearchOpen && (
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex flex-1 max-w-xl mx-12 items-center bg-gray-50 border border-gray-200 rounded-full px-5 py-2 transition-all focus-within:border-black focus-within:bg-white"
                    >
                        <FaSearch className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search for products, concerns, ingredients..."
                            className="w-full outline-none text-sm bg-transparent"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="hidden">Search</button>
                        <FaTimes
                            className="ml-3 text-gray-400 hover:text-red-500 cursor-pointer text-lg"
                            onClick={() => setIsSearchOpen(false)}
                        />
                    </form>
                )}
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item">About</li>
                <li className="nav-item">Contact</li>
                <li className="nav-item"><Link to="/">Product</Link></li>
                
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                    <FaSearch className={`text-lg transition-colors ${isSearchOpen ? 'text-indigo-600' : 'text-gray-700'}`} />
                </button>

                <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex text-gray-700">
                    <FaRegStar className="text-xl" />
                    {totalWishlistCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                            {totalWishlistCount > 99 ? "99+" : totalWishlistCount}
                        </span>
                    )}
                </Link>

                <Link
                    to="/cart"
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                    title="View Cart"
                >
                    <FaShoppingCart className="text-xl" />
                    {totalCount > 0 && (
                        <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                            {totalCount > 99 ? "99+" : totalCount}
                        </span>
                    )}
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar
