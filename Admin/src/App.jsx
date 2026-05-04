
import React, { useState } from 'react';
import Product_Page from './Product_Page.jsx';
import Slider from './Slider.jsx';
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard'); // Default to dashboard or slider

  const renderView = () => {
    switch (activeView) {
      case 'slider':
        return <Slider />;
      case 'product':
        return <Product_Page />;
      default:
        return <div className="dashboard"><h1>Welcome to Admin Panel</h1><p>Select an option from the sidebar.</p></div>;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <button onClick={() => setActiveView('dashboard')}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => setActiveView('slider')}>Slider</button>
          </li>
          <li>
            <button onClick={() => setActiveView('product')}>Product</button>
          </li>
        </ul>
      </div>
      <div className="main-content">
        {renderView()}
      </div>
    </div>
  );
};

export default App;