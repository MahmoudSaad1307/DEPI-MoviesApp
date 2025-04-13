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
const db = getFirestore(app);

async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data().);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
fetchData()
