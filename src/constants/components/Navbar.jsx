import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Search from "../../components/search";
import "../../pages/Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const dropdownRef = useRef(null); // Ref for outside click detection
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User in Navbar:", user);
    console.log("Token in Navbar:", token);
  }, [user]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsDropdownOpen(false); // Close dropdown on logout click
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowLogoutModal(false);
  };

  const closeModal = () => {
    setShowLogoutModal(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  return (
    <header className="bg-dark text-white sticky-top" style={{ zIndex: 1030, height: "50px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container py-0">
          <Link className="navbar-brand d-flex align-items-center mb-0 p-0" to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/social-app-834ec.appspot.com/o/ChatGPT_Image_May_7__2025__07_36_25_PM-removebg-preview%20(2).png?alt=media&token=06238ea3-6171-47c7-b012-d3a82938460c"
              style={{ width: "100px", height: "80px", objectFit: "cover", margin: "0" }}
              alt="MovieRecom Logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex categories-ul">
              <li className="nav-item">
                <Link className="nav-link" to="/movies" onClick={() => setIsNavOpen(false)}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tvshows" onClick={() => setIsNavOpen(false)}>
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recommendation" onClick={() => setIsNavOpen(false)}>
                  Recommendation
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/whatIsMovie" onClick={() => setIsNavOpen(false)}>
                  What Is Movie
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center justify-content-center">
              <ul className="navbar-nav">
                <li className="nav-item me-2 mb-2 mb-md-0 search">
                  <a href="#" title="Search" onClick={toggleSearch}>
                    <i className="bi bi-search" style={{ fontSize: "18px" }}></i>
                  </a>
                </li>

                {user && (
                <li className="nav-item dropdown fs-5" ref={dropdownRef}>
  <a
    className="dropdown-toggle d-flex align-items-center"
    id="navbarDropdown"
    role="button"
    onClick={toggleDropdown}
    aria-expanded={isDropdownOpen}
  >
    <i
      className="me-2"
      style={{
        backgroundImage: `url(${user?.photoURL || "https://via.placeholder.com/40"})`,
        display: "inline-block",
        width: "40px",
        height: "40px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50%",
      }}
    ></i>
  </a>
  <ul
    className={`dropdown-menu dropdown-menu-end flex-column align-items-center rounded-3 fs-5 ${
      isDropdownOpen ? "show" : ""
    }`}
  >
    <li className="dropdown-item no-hover py-2">
      <Link to="/user" onClick={() => { setIsDropdownOpen(false); setIsNavOpen(false); }}>
        Profile
      </Link>
    </li>
    <li id="logOut" className="li-log-out px-3 dropdown-item">
      <button
        style={{
          color: "white",
          border: "none",
          background: "transparent",
        }}
        className="dropdown-item log-out-btn"
        onClick={() => {
          handleLogoutClick();
          setIsNavOpen(false);
        }}
      >
        Sign Out
      </button>
    </li>
  </ul>
</li>
                )}
              </ul>

              {!user && (
                <div style={{ display: "flex" }}>
                  <Link className="nav-link" to="/signup" onClick={() => setIsNavOpen(false)}>
                    <button className="btn text-light ms-3">SignUp</button>
                  </Link>
                  <Link className="nav-link" to="/login" onClick={() => setIsNavOpen(false)}>
                    <button className="btn ms-3 text-light">Login</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isSearchVisible && <Search setIsSearchVisible={setIsSearchVisible} />}

      <div
        className={`modal fade ${showLogoutModal ? "show" : ""}`}
        style={{ display: showLogoutModal ? "block" : "none" }}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden={!showLogoutModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to sign out?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                No
              </button>
              <button
                type="button"
                id="ll"
                className="btn btn-primary logOut text-light"
                style={{ background: "red" }}
                onClick={confirmLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div
          className="modal-backdrop fade show"
          onClick={closeModal}
          style={{ zIndex: 1040 }}
        ></div>
      )}
    </header>
  );
};

export default Navbar;