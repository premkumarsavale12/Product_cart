import React, { useState } from 'react'
import './Navbar.css'
import { FaSearch } from 'react-icons/fa'
const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const handleSearch = () => {

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


                <li className="nav-item">Home</li>
                <li className="nav-item">About</li>
                <li className="nav-item">Contact</li>
                <li className="nav-item">Product</li>
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                    <FaSearch className={`text-lg transition-colors ${isSearchOpen ? 'text-indigo-600' : 'text-gray-700'}`} />
                </button>
            </ul>

        </nav>


    )
}

export default Navbar
