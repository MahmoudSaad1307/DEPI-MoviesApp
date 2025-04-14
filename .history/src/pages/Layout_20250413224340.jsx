// src/Layout.jsx
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
