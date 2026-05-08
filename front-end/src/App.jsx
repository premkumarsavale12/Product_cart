import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Slider from './Slider';
import Product from './Product';
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import CartPage from './CartPage';
import Wishlist from './Wishlist';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductFilter from './ProductFilter';
import About from './About';

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Slider />
                <Product />
              </>
            } />   
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/productfilter" element={<ProductFilter />} />
            <Route path="/productfilter/:id" element={<ProductFilter />} />
            <Route path='/about' element={<About />}> </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;