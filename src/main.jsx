// main.jsx
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import  './pages/styles.css';
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import store, { persistor } from "./redux/store";
import  './App.css'

import App from "./App";

const GOOGLE_CLIENT_ID = "520194609314-l229tksala5kgcqadf21ilhqsl80vfr8.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HashRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </HashRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);