import React, { useState } from 'react'
import './Navbar.css'
import { FaSearch, FaTimes, FaRegStar, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from './context/WishlistContext';
import { useCart } from './context/CartContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const { totalCount } = useCart();
    const { totalWishlistCount } = useWishlist();

    const handleSearch = (e) => {
        e.preventDefault();
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.href = "/login"; // Force reload to clear state in App
            }
        })
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
                            placeholder="Search for products..."
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
                <li className="nav-item"><Link to="/about">About</Link></li>
                <li className="nav-item">Contact</li>
                <li className="nav-item"><Link to="/productfilter">Product</Link></li>

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

                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                    title="Logout"
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                    <FaSignOutAlt className="text-xl" />
                </button>
            </ul>
        </nav>
    )
}

export default Navbar

