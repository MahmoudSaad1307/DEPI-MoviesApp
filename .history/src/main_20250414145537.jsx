// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebase/firebase';

import App from './App'
import { registerUser } from './firebase/firebaseServices';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);
