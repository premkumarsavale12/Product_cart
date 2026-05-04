import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Product_Page from './Product_Page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Product_Page />

  </StrictMode>,
)
