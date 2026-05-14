import React, { useState } from 'react';
import Product_Page from './Product_Page.jsx';
import Slider from './Slider.jsx';
import './App.css';
import AboutHero from './AboutHero.jsx';
import AboutMiddle from "./AboutMiddle.jsx";
import Founder_Section from './Founder_Section.jsx';
import Latest_Sales from './Latest_Sales.jsx';
import Category from './Category.jsx';
import Selling_Product from './Selling_Product.jsx';
import Login from './Login.jsx';

const App = () => {

  // Check token directly when app loads
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [activeView, setActiveView] = useState('dashboard');

  // Called after successful login
  const handleLogin = () => {
    localStorage.setItem("token", "admin-token");
    setIsAuthenticated(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'slider':
        return <Slider />;

      case 'product':
        return <Product_Page />;

      case 'abouthero':
        return <AboutHero />;

      case 'aboutmiddle':
        return <AboutMiddle />;

      case 'foundersection':
        return <Founder_Section />;

      case 'discount':
        return <Latest_Sales />;

      case 'category':
        return <Category />;

      case 'selling_product':
        return <Selling_Product />;

      default:
        return (
          <div className="dashboard">

            <div className="welcome-card">

              <h1>Welcome to Admin Panel</h1>

              <a href="http://localhost:5174">
                <button
                  class="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg shadow
                  hover:bg-blue-700 hover:shadow-lg transition duration-200"
                >
                  Go to Frontend Page
                </button>
              </a>

            </div>
          </div>
        );
    }
  };

  // First show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // After login show dashboard
  return (
    <div className="admin-container">

      <div className="sidebar">

        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <ul className="sidebar-menu">

          <li className={activeView === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveView('dashboard')}>
              Dashboard
            </button>
          </li>

          <li className={activeView === 'slider' ? 'active' : ''}>
            <button onClick={() => setActiveView('slider')}>
              Slider
            </button>
          </li>

          <li className={activeView === 'product' ? 'active' : ''}>
            <button onClick={() => setActiveView('product')}>
              Product
            </button>
          </li>

          <li className={activeView === 'abouthero' ? 'active' : ''}>
            <button onClick={() => setActiveView('abouthero')}>
              AboutHero
            </button>
          </li>

          <li className={activeView === 'aboutmiddle' ? 'active' : ''}>
            <button onClick={() => setActiveView('aboutmiddle')}>
              AboutMiddle
            </button>
          </li>

          <li className={activeView === 'foundersection' ? 'active' : ''}>
            <button onClick={() => setActiveView('foundersection')}>
              Founder
            </button>
          </li>

          <li className={activeView === 'discount' ? 'active' : ''}>
            <button onClick={() => setActiveView('discount')}>
              Latest Sales
            </button>
          </li>

          <li className={activeView === 'category' ? 'active' : ''}>
            <button onClick={() => setActiveView('category')}>
              Category Section
            </button>
          </li>

          <li className={activeView === 'selling_product' ? 'active' : ''}>
            <button onClick={() => setActiveView('selling_product')}>
              Selling Product
            </button>
          </li>

        </ul>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      <div className="main-content">
        {renderView()}
      </div>

    </div>
  );
};

export default App;