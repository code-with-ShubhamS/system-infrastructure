import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SuccessPage from './SuccessPage.jsx';
import { CheckoutForm } from './CheckoutPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This can include Header/Footer
  },
  {
    path: "/success",
    element: <SuccessPage />, // This can include Header/Footer
  },
  {
    path: "/web/checkout",
    element: <CheckoutForm/>, // This can include Header/Footer
  },
  // { path: "*", element: <NotFound /> }, 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>
);