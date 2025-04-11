// src/pages/UserPage.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 

const UserPage = () => {
  return (
    <div className="d-flex justify-content-center min-vh-100" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="w-100">
        <div className="container py-4">
          {/* User Profile Section */}
          <section className="my-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle me-3" style={{ fontSize: "60px", color: "#6c757d" }}></i>
                <div>
                  <h2 className="h5 mb-1 text-white">UserNameHere</h2>
                  <button className="btn btn-success btn-sm">Edit Profile</button>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-outline-light btn-sm me-2">Rates</button>
                <button className="btn btn-outline-light btn-sm me-2">Watchlist</button>
                <button className="btn btn-outline-light btn-sm">Lists</button>
              </div>
            </div>
          </section>

          {/* Watchlist Section */}
          <section className="mb-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
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
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <h2 className="h5 text-white mb-3">Lists <span className="badge bg-secondary">0</span></h2>
              <div className="text-center py-4">
                <h3 className="h6 text-white">No lists yet</h3>
                <button className="btn btn-primary mt-2 btn-sm">Create a list</button>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-5">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
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
