// src/Layout.jsx
import Navbar from "../constants/components/Navbar"; 
import Footer from "../constants/components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <Navbar />

  <main style={{ flex: 1, overflowY: 'auto' }}>
    <Outlet />
  </main>

  <Footer />
</div>

    </>
  );
};

export default Layout;
