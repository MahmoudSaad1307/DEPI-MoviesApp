// src/pages/LoginPage.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { loginUser } from "../api/api";
import { getToken, setToken } from "../utilites/auth";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../redux/slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const {isAuthenticated,token} =useSelector((state)=>state.auth)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: email, password: password });

      const to = response.data.token;
      // setToken(to);
      dispatch(login({token:getToken()}))
// console.log(isAuthenticated);

      // console.log(token);
      // console.log(to);
      

      alert("login success");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
    
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
            <h2 className="h5 text-white mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
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
              <div className="mb-4">
                <label className="form-label text-white">Password</label>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Login
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
