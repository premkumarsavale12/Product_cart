import React, { useState } from 'react'
import './Navbar.css'
import { FaSearch, FaTimes, FaRegStar, FaShoppingCart, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from './context/WishlistContext';
import { useCart } from './context/CartContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const { totalCount } = useCart();
    const { totalWishlistCount } = useWishlist();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productfilter?search=${searchQuery}`);
            setIsSearchOpen(false);
            setIsMenuOpen(false);
        }
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
                window.location.href = "/login";
            }
        })
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>ShopLogo</Link>
                </div>

                <div className={`nav-menu-wrapper ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li className="nav-item"><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                        <li className="nav-item"><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                        <li className="nav-item"><Link to="/productfilter" onClick={() => setIsMenuOpen(false)}>Product</Link></li>
                        <li className="nav-item">
                            <a href="http://localhost:5173" onClick={() => setIsMenuOpen(false)}  >  Admin Panel  </a> </li>
                    </ul>
                </div>

                <div className="nav-actions">
                    {isSearchOpen && (
                        <form
                            onSubmit={handleSearch}
                            className="search-bar-overlay"
                        >
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input-field"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaTimes
                                className="close-search"
                                onClick={() => setIsSearchOpen(false)}
                            />
                        </form>
                    )}

                    <button
                        className="action-btn search-trigger"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <FaSearch />
                    </button>

                    <Link to="/wishlist" className="action-btn relative">
                        <FaRegStar />
                        {totalWishlistCount > 0 && (
                            <span className="badge red-badge">
                                {totalWishlistCount > 99 ? "99+" : totalWishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="action-btn relative">
                        <FaShoppingCart />
                        {totalCount > 0 && (
                            <span className="badge indigo-badge">
                                {totalCount > 99 ? "99+" : totalCount}
                            </span>
                        )}
                    </Link>

                    <button onClick={handleLogout} className="action-btn logout-btn">
                        <FaSignOutAlt />
                    </button>

                    <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar