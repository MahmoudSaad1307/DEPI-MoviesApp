// src/Layout.jsx
import Navbar from "../constants/components/Navbar"; 
import Footer from "../constants/components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <main className="flex-grow-1"> */}
        <Outlet />
      {/* </main> */}

      <Footer />
    </>
  );
};

export default Layout;
