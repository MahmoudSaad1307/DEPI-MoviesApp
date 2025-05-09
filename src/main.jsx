// main.jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import  './pages/styles.css';
import { StrictMode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; // Add this import
import store, { persistor } from "./redux/store";
import  './App.css'

import App from "./App";
// import { registerUser } from "./firebase/firebaseServices";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/DEPI-MoviesApp">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);