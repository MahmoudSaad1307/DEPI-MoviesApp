import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { loginUser } from "../api/api";
import { getToken, setToken } from "../utilites/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setFavorites, setWatched, setWatchlist } from "../redux/slices/userMoviesSlice";
import Swal from "sweetalert2";
import './LoginPage.css'
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.user);
  const { favorites, watchlist, watched } = useSelector((state) => state.userMovies);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(favorites, "dasjkflk");
  }, [favorites]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: email, password: password });
      const userMovies = response.data.userWithoutPassword.movies;
      dispatch(setFavorites(userMovies.favorites));
      dispatch(setWatchlist(userMovies.watchlist));
      dispatch(setWatched(userMovies.watched));

      const to = response.data.token;
      setToken(to);
      dispatch(login({ token: getToken(), user: response.data.userWithoutPassword }));
      Swal.fire({
        title: "Login Success !",
        icon: "success",
        html: '<style>.swal2-title { border: none }</style>',
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Please check your email and password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        background: "linear-gradient(to bottom, #1c2526, #2e3b3e)", // Dark gradient background
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
              backgroundColor: "rgba(40, 44, 52, 0.95)", // Slightly lighter background
              borderRadius: "15px", // Rounded corners
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Subtle shadow
            }}
          >
            <h2 className="h4 text-white mb-4 text-center" style={{ fontWeight: "600" }}>
              Sign In
            </h2>
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-4 position-relative">
                <label className="form-label text-white" style={{ fontSize: "0.9rem" }}>
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
                <label className="form-label text-white" style={{ fontSize: "0.9rem" }}>
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

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    background: "linear-gradient(to right, #28a745, #218838)",
                    border: "none",
                    padding: "12px",
                    fontWeight: "500",
                    transition: "transform 0.2s, background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "linear-gradient(to right, #218838, #1e7e34)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "linear-gradient(to right, #28a745, #218838)")
                  }
                  onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <a
                href="/signup"
                className="text-white text-decoration-none"
                style={{ fontSize: "0.85rem", opacity: "0.8" }}
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
              >
                Don’t have an account? Sign Up
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;