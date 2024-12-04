import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css_index.css'
import App from './comp_Kaban.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App/>
  </StrictMode>,
)
