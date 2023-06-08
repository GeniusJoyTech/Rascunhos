import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter as createBrowserRouter, RouterProvider } from "react-router-dom";
import Roteiro from './routes/promotor/Roteiro.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/promotor",
    element: <Roteiro />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
