
import React, { useState } from 'react';
import Product_Page from './Product_Page.jsx';
import Slider from './Slider.jsx';
import './App.css';
import AboutHero from './AboutHero.jsx';
import AboutMiddle from "./AboutMiddle.jsx"
import Founder_Section from './Founder_Section.jsx';
import Latest_Sales from './Latest_Sales.jsx';
import Category from './Category.jsx';
 


const App = () => {
  const [activeView, setActiveView] = useState('dashboard'); // Default to dashboard or slider

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
           return <Category />


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
          <li>
            <button onClick={() => setActiveView('abouthero')}>AboutHero</button>
          </li>

          <li>
            <button onClick={() => setActiveView('aboutmiddle')}> AboutMiddleSection </button>
          </li>

          <li>
            <button onClick={() => setActiveView('foundersection')}> Founder </button>
          </li>


          <li>
            <button onClick={() => setActiveView('discount')}> Latest Sales  </button>
          </li>

  
          <li>
            <button onClick={() => setActiveView('category')}> Category Section  </button>
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