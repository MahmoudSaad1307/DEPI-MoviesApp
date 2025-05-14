import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { registerUser } from "../../Backend/api/api";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await registerUser({ name: username, email: email, password: password });
      Swal.fire({
        title: "User Registered Successfully !",
        icon: "success",
        html: "<style>.swal2-title { border: none }</style>",
      });
      navigate("/login");
    } catch (error) {
      alert(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative signup-container"
      style={{
        background: "linear-gradient(to bottom, #1c2526, #2e3b3e)", // Gradient background matching LoginPage
      }}
    >
      {/* Dark Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
      ></div>

      {/* Main content */}
      <div className="w-100 position-relative" style={{ zIndex: 2 }}>
        <div className="container py-5">
          <section
            className="card p-4 border-0 mx-auto animate__animated animate__fadeIn"
            style={{
              maxWidth: "450px",
              backgroundColor: "rgba(40, 44, 52, 0.95)", 
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", 
            }}
          >
            <h2
              className="h4 text-white mb-4 text-center"
              style={{ fontWeight: "600" }}
            >
              Create an Account
            </h2>
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
                style={{
                  fontSize: "0.85rem",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(220, 53, 69, 0.9)",
                  color: "#fff",
                }}
              >
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-4 position-relative">
                <label
                  className="form-label text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  Username
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-dark border-secondary text-white"
                    style={{ borderRight: "none" }}
                  >
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    style={{
                      borderLeft: "none",
                      padding: "10px",
                      transition: "border-color 0.3s",
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 position-relative">
                <label
                  className="form-label text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  Email Address
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-dark border-secondary text-white"
                    style={{ borderRight: "none" }}
                  >
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    style={{
                      borderLeft: "none",
                      padding: "10px",
                      transition: "border-color 0.3s",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4 position-relative">
                <label
                  className="form-label text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  Password
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-dark border-secondary text-white"
                    style={{ borderRight: "none" }}
                  >
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    style={{
                      borderLeft: "none",
                      padding: "10px",
                      transition: "border-color 0.3s",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 position-relative">
                <label
                  className="form-label text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  Confirm Password
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-dark border-secondary text-white"
                    style={{ borderRight: "none" }}
                  >
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    style={{
                      borderLeft: "none",
                      padding: "10px",
                      transition: "border-color 0.3s",
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                  style={{
                    background: loading
                      ? "linear-gradient(to right, #28a745, #218838)"
                      : "linear-gradient(to right, #28a745, #218838)",
                    border: "none",
                    padding: "12px",
                    fontWeight: "500",
                    transition: "transform 0.2s, background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    !loading &&
                    (e.target.style.background =
                      "linear-gradient(to right, #218838, #1e7e34)")
                  }
                  onMouseLeave={(e) =>
                    !loading &&
                    (e.target.style.background =
                      "linear-gradient(to right, #28a745, #218838)")
                  }
                  onMouseDown={(e) =>
                    !loading && (e.target.style.transform = "scale(0.98)")
                  }
                  onMouseUp={(e) =>
                    !loading && (e.target.style.transform = "scale(1)")
                  }
                >
                  {loading ? (
                    <>
                      <ClipLoader color="var(--secondary-color)" size={20} />
                      <span className="ms-2">Loading...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <p>
                <span
                  style={{
                    color: "white",
                    fontSize: "0.85rem",
                    opacity: "0.8",
                  }}
                >
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-primary text-decoration-none"
                  style={{ fontSize: "0.85rem", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "1")}
                  onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
                >
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
