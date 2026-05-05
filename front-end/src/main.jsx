import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Navbar from './Navbar'
import Slider from "./Slider"
import Product from './Product'
import Footer from './Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Navbar />
    <Slider />
    <Product />

<Footer />
 
  </StrictMode>,
)
