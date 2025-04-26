import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import Search from "../../components/search";

const Navbar = () => {
  // State to manage the visibility of the search input
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Function to toggle the search input visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
     <header className="bg-dark text-white position-relative" style={{ zIndex: 10 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-film fs-4 me-2"></i>
            <span className="fw-bold">MovieRecom</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Links (Home, Profile, Actor, Movies, TV Shows) */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
              
            
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tv-shows">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recommendation">
                Recommendation 
                </Link>
              </li> 
              
            </ul>

            {/* Right Side (icons and dropdown) */}
            <div className="d-flex align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#"
                    title="Search"
                    onClick={toggleSearch}
                  >
                    <i className="bi bi-search"></i>
                  </a>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link" href="#" title="Featured">
                    <i className="bi bi-lightning-charge-fill"></i>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle fs-5 me-2"></i>
                    Username
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/user">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/watchlist">
                        Watchlist
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <Link className="nav-link" to="/signup"><button className="btn btn-outline-light ms-3">SignUp</button></Link>
              <Link className="nav-link" to="/login"><button className="btn btn-success ms-3">Login</button></Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Conditionally render the search input */}
      {isSearchVisible && (
        <Search setIsSearchVisible={setIsSearchVisible} />
      )}
    </header>
  );
};

export default Navbar;
