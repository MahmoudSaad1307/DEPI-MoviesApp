import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 

const App = () => {
  return (
    <div className="d-flex justify-content-center min-vh-100" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="w-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#000" }}>
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center text-white" href="#" style={{ fontWeight: "bold" }}>
              <i className="bi bi-film me-2" style={{ fontSize: "30px", color: "#00c030" }}></i>
              MovieRecom
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown d-block d-lg-none ms-auto">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menu
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item text-white" href="#">
                        Home
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item text-white" href="#">
                        Movies
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item text-white" href="#">
                        Contact
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <form className="d-flex mx-auto">
                <input
                  className="form-control me-2"
                  style={{ backgroundColor: "grey", color: "white", border: "1px solid #333", placeholder: "white" ,}}
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-none d-lg-flex">
                <li className="nav-item">
                  <a className="nav-link active text-white" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Movies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container py-4">
          {/* User Profile Section */}
          <section className="my-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle me-3" style={{ fontSize: "60px", color: "#6c757d" }}></i>
                <div>
                  <h2 className="h5 mb-1 text-white">UserNameHere</h2>
                  <button className="btn btn-success btn-sm">
                    Edit Profile
                  </button>
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
                <button className="btn btn-info mt-3 btn-sm text-white">
                  Browse popular movies
                </button>
              </div>
            </div>
          </section>

          {/* Lists Section */}
          <section className="mb-4">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <h2 className="h5 text-white mb-3">
                Lists <span className="badge bg-secondary">0</span>
              </h2>
              <div className="text-center py-4">
                <h3 className="h6 text-white">No lists yet</h3>
                <button className="btn btn-primary mt-2 btn-sm">Create a list</button>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-5">
            <div className="card p-3 border-0" style={{ backgroundColor: "#1a1a1a" }}>
              <h2 className="h5 text-white mb-3">
                Reviews <span className="badge bg-secondary">0</span>
              </h2>
              <div className="text-center py-4">
                <h3 className="h6 text-white">No reviews yet</h3>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="py-4" style={{ backgroundColor: "#000" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <a href="#" className="text-white me-3">
                  Help
                </a>
                <a href="#" className="text-white me-3">
                  Site Index
                </a>
                <a href="#" className="text-white">
                  Box Office Mojo
                </a>
              </div>
              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <p className="mb-1 text-white">Follow MovieRecom on social</p>
                <div className="d-flex justify-content-md-end gap-2">
                  <a href="#" className="text-white">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="bi bi-tiktok"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="mb-0 text-white">
                © 2024-2025 by MovieRecom, Inc. — An <strong style={{ color: "#00c030" }}>MovieRecom</strong>{" "}
                Company
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;