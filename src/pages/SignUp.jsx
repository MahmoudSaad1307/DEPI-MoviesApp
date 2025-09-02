import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { registerUser } from "../../api/api";
import "./SignUp.css";
import { getToken, setToken } from "../utilites/auth";
import { login } from "../redux/slices/userSlice";
import { setFavorites, setWatched, setWatchlist } from "../redux/slices/userMoviesSlice";
import { signInWithGoogle } from "../firebase/firebaseServices";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.user);
  const { favorites, watchlist, watched } = useSelector(
    (state) => state.userMovies
  );

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };
   const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    
    try {
      const response = await signInWithGoogle();

      const userMovies = response.data.user.movies;
      dispatch(setFavorites({ favorites: userMovies.favorites }));
      dispatch(setWatchlist({ watchlist: userMovies.watchlist }));
      dispatch(setWatched({ watched: userMovies.watched }));

      const to = response.data.token;
      setToken(to);
      dispatch(
        login({ token: getToken(), user: response.data.user })
      );


      Swal.fire({
        title: "Welcome To CineMirage !",
        icon: "success",
        html: "<style>.swal2-title { border: none }</style>",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Unable to sign in with Google",
        icon: "error",
        html: "<style>.swal2-title { border: none }</style>",
      });
    } finally {
      setGoogleLoading(false);
    }
  };
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

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character."
      );
      setLoading(false);
      return;
    }

  try {
    setLoading(true);
    
    const response = await registerUser({
      name: username,
      email: email,
      password: password,
    });
    
    console.log("Registration response:", response.data);
    
    if (response.data && response.data.token) {
        const userMovies = response.data.user.movies;
            dispatch(setFavorites({ favorites: userMovies.favorites }));
            dispatch(setWatchlist({ watchlist: userMovies.watchlist }));
            dispatch(setWatched({ watched: userMovies.watched }));
      
      setToken(response.data.token);
      console.log("Token:", response.data.token);
      
      dispatch(
        login({ token: response.data.token, user: response.data.user })
      );
      
      Swal.fire({
        title: "User Registered Successfully!",
        icon: "success",
        html: "<style>.swal2-title { border: none }</style>",
      });
      
      navigate("/");
    } else {
      Swal.fire({
        title: "User Registered Successfully!",
        icon: "success",
        html: "<style>.swal2-title { border: none }</style>",
      });
      
      // Navigate to login page instead
      navigate("/login");
    }
  } catch (error) {
    console.error("Registration error:", error);
    
    Swal.fire({
      title:
        error.response?.data === "[object Object]"
          ? "User Registration Failed!"
          : error.response?.data || "Registration failed. Please try again.",
      icon: "error",
      html: "<style>.swal2-title { border: none }</style>",
    });
  } finally {
    setLoading(false);
  }
}

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative signup-container"
      style={{
        background: "linear-gradient(to bottom, #1c2526, #2e3b3e)",
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
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-dark text-white border-secondary"
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      padding: "10px",
                      transition: "border-color 0.3s",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="input-group-text bg-dark border-secondary text-white"
                    style={{ borderLeft: "none", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    ></i>
                  </span>
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
                  className="btn btn-success d-flex align-items-center justify-content-center"
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
            <div className="d-flex h-100 w-100 justify-content-center  google-sign-container align-items-center bg-dark text-center">
              <button
                type="button"
                className="btn mt-2 google-sign
  shadow-sm d-flex align-items-center justify-content-center gap-2   border rounded"
                onClick={handleGoogleSignIn}
                // disabled={disabled}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: "18px", height: "18px" }}
                >
                 {  !googleLoading&&  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
}
                </div>

                <span className="d-flex align-items-center gap-2">
                  {" "}
                  {googleLoading ? (
                    <>
                      <ClipLoader color="var(--secondary-color)" size={20} />
                      <span className="ms-2">Loading...</span>
                    </>
                  ) : (
                    "Sign in with Google"
                  )}
                </span>
              </button>
            </div>
            <div className="text-center mt-3">
              <p>
                <span
                  className="text-secondary"
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
                  className="fw-bold text-white text-decoration-none"
                  style={{ fontSize: "0.85rem", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "1")}
                  onMouseLeave={(e) => (e.target.style.opacity = "0.6")}
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
