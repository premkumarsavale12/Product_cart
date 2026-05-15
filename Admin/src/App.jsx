import React, { useState } from 'react';
import Product_Page from './Product_Page.jsx';
import Slider from './Slider.jsx';
import AboutHero from './AboutHero.jsx';
import AboutMiddle from "./AboutMiddle.jsx";
import Founder_Section from './Founder_Section.jsx';
import Latest_Sales from './Latest_Sales.jsx';
import Category from './Category.jsx';
import Selling_Product from './Selling_Product.jsx';

const App = () => {

  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {

    switch (activeView) {
      case 'slider': return <Slider />;
      case 'product': return <Product_Page />;
      case 'abouthero': return <AboutHero />;
      case 'aboutmiddle': return <AboutMiddle />;
      case 'foundersection': return <Founder_Section />;
      case 'discount': return <Latest_Sales />;
      case 'category': return <Category />;
      case 'selling_product': return <Selling_Product />;
      default:
        return (
          <div className="text-center p-[50px]">
            <div>
              <h1 className='text-[#2c3e50] font-bold text-4xl m-0'>
                Welcome to Admin Panel
              </h1>
            </div>
          </div>
        );
    }
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'slider', label: 'Slider' },
    { id: 'product', label: 'Product' },
    { id: 'abouthero', label: 'AboutHero' },
    { id: 'aboutmiddle', label: 'AboutMiddle' },
    { id: 'foundersection', label: 'Founder' },
    { id: 'discount', label: 'Latest Sales' },
    { id: 'category', label: 'Category Section' },
    { id: 'selling_product', label: 'Selling Product' },
  ];

  return (
    <div className="flex h-screen font-sans relative overflow-hidden bg-[#ecf0f1]">
      
   
      <button 
        className="md:hidden absolute top-[15px] left-[15px] z-[100] bg-[#2c3e50] text-white border-none py-[10px] px-[15px] text-[20px] rounded-[5px] cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

  
      <div className={`w-[250px] bg-[#2c3e50] text-white p-[20px] box-border transition-transform duration-300 ease-in-out z-50 h-screen overflow-y-auto absolute md:static left-0 top-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        <div className="flex justify-between items-center mb-[20px]">
          <h2 className="m-0 text-2xl font-bold">Admin Panel</h2>
          <button 
            className="md:hidden bg-transparent border-none text-white text-[24px] cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <ul className="list-none p-0 m-0">
          {navItems.map((item) => (
            <li key={item.id} className="mb-[10px]">
              <button 
                onClick={() => handleNavClick(item.id)}
                className={`w-full p-[10px] bg-transparent border-none text-white text-left cursor-pointer rounded-[5px] transition-colors duration-300 hover:bg-[#34495e] ${activeView === item.id ? 'bg-[#34495e]' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

      </div>

   
      <div className="flex-1 p-[20px] bg-[#ecf0f1] overflow-y-auto h-screen md:pt-[20px] pt-[70px]">
        {renderView()}
      </div>

    </div>
  );
};

export default App;