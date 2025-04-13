/* eslint-disable @typescript-eslint/no-unused-vars */
import { StrictMode,useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebase/firebase';

import './index.css'
import App from './App'
import { registerUser } from './utilites/firebase/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

  </StrictMode>,
)
