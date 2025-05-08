import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { registerUser } from "../api/api";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate for redirecting

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await registerUser({ name: username, email: email, password: password });
      alert("user registered successfully");
    } catch (error) {

alert(error.toString)

    }

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        backgroundImage: "url('/src/pages/UserPageEditBG.jpg')", // Adjust path to the image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1 }}
      ></div>

      {/* Main content */}
      <div className="w-100 position-relative" style={{ zIndex: 2 }}>
        <div className="container py-5">
          <section
            className="card p-4 border-0 mx-auto"
            style={{
              maxWidth: "450px",
              backgroundColor: "rgba(27, 27, 27, 0.82)",
            }}
          >
            <h2 className="h5 text-white mb-4 text-center">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label text-white">Username</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-3 text-center">
              <p>
                <span style={{ color: "white" }}>
                  Already have an account?{" "}
                </span>
                <Link to="/login" className="text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
