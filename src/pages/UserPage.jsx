// src/pages/UserPage.jsx
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserPage = () => {
  // You can replace these values with props or state if you fetch user data dynamically
  const userName = "UserNameHere";
  const email = "user@example.com";
  const birthDate = "1999-01-01";

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
      style={{ backgroundColor: "rgba(18, 18, 18, 0.7)", zIndex: 1 }}
    ></div>
       <div className="w-100 position-relative" style={{ zIndex: 2 }}>  
        <div className="container py-4">
          {/* User Profile Section */}
          <section className="my-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "rgba(27, 27, 27, 0.82)" }}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person-circle me-3" style={{ fontSize: "60px", color: "#6c757d" }}></i>
                  <div>
                    <h2 className="h5 mb-1 text-white">{userName}</h2>
                    <p className="mb-1 text-white-50" style={{ fontSize: "0.9rem" }}>
                      <i className="bi bi-envelope me-2"></i>{email}
                    </p>
                    <p className="mb-2 text-white-50" style={{ fontSize: "0.9rem" }}>
                      <i className="bi bi-calendar3 me-2"></i>{birthDate}
                    </p>
                    <Link to="/user/edit">
                      <button className="btn btn-success btn-sm">Edit Profile</button>
                    </Link>
                  </div>
                </div>
        <div className="ms-auto d-flex flex-column align-items-end">
             <button className="btn btn-outline-light btn-lg mb-2 w-100 fw-semibold rounded-3">
                   Rates
                      </button>
             <button className="btn btn-outline-light btn-lg mb-2 w-100 fw-semibold rounded-3">
                    Watchlist
                      </button>
             <button className="btn btn-outline-light btn-lg mb-2 w-100 fw-semibold rounded-3">
                     Lists
                      </button>
                </div>
              </div>
            </div>
          </section>

          {/* Watchlist Section */}
          <section className="mb-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "rgba(27, 27, 27, 0.82)"  }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0 text-white">
                  Watchlist <span className="badge bg-secondary">0</span>
                </h2>
              </div>
              <div className="text-center py-4">
                <h3 className="h6 text-white">My Movie Watch List</h3>
                <button className="btn btn-info mt-3 btn-sm text-white">Browse popular movies</button>
              </div>
            </div>
          </section>

          {/* Lists Section */}
          <section className="mb-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "rgba(27, 27, 27, 0.82)" }}>
              <h2 className="h5 text-white mb-3">Lists <span className="badge bg-secondary">0</span></h2>
              <div className="text-center py-4">
                <h3 className="h6 text-white">No lists yet</h3>
                <button className="btn btn-primary mt-2 btn-sm">Create a list</button>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-5">
            <div className="card p-3 border-0" style={{ backgroundColor: "rgba(27, 27, 27, 0.82)" }}>
              <h2 className="h5 text-white mb-3">Reviews <span className="badge bg-secondary">0</span></h2>
              <div className="text-center py-4">
                <h3 className="h6 text-white">No reviews yet</h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
