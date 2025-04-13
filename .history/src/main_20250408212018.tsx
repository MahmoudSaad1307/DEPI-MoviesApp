/* eslint-disable @typescript-eslint/no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebase';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

  </StrictMode>,
)
