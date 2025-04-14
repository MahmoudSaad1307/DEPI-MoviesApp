// src/pages/UserEditPage.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const UserEditPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here (e.g., send data to your backend)
    console.log({ email, password, birthDate, photo });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        backgroundImage: "url('/src/pages/UserPageEditBG.jpg')",
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
            style={{ maxWidth: "450px", backgroundColor: "rgba(27, 27, 27, 0.82)"  }}
          >
            <h2 className="h5 text-white mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              {/* Profile Photo */}
              <div className="mb-3 text-center">
                <i className="bi bi-person-circle" style={{ fontSize: "80px", color: "#6c757d" }}></i>
                <div className="mt-2">
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>
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

              {/* Birth Date */}
              <div className="mb-4">
                <label className="form-label text-white">Birth Date</label>
                <input
                  type="date"
                  className="form-control bg-dark text-white border-secondary"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
