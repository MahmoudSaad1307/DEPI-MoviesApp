import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./actor.css";

const ActorPage = () => {
  return (
    <>
      <header className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <i className="bi bi-film fs-4 me-2"></i>
              <span className="fw-bold">MovieRecom</span>
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {["Films", "Lists", "Members", "Journal"].map((nav, index) => (
                  <li className="nav-item" key={index}>
                    <a className="nav-link" href="#">{nav}</a>
                  </li>
                ))}
              </ul>
              <div className="d-flex align-items-center">
                <ul className="navbar-nav">
                  <li className="nav-item me-3">
                    <a className="nav-link" href="#" title="Search">
                      <i className="bi bi-search"></i>
                    </a>
                  </li>
                  <li className="nav-item me-3">
                    <a className="nav-link" href="#" title="Featured">
                      <i className="bi bi-lightning-charge-fill"></i>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle d-flex align-items-center" 
                      href="#" 
                      id="navbarDropdown" 
                      role="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-person-circle fs-5 me-2"></i>
                      Username
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {[
                        "Profile","Watchlist", "Sign Out",
                      ].map((item, index) =>
                        item === "Settings" ? (
                          <React.Fragment key={index}>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">{item}</a></li>
                          </React.Fragment>
                        ) : (
                          <li key={index}><a className="dropdown-item" href="#">{item}</a></li>
                        )
                      )}
                    </ul>
                  </li>
                </ul>
                <button className="btn btn-outline-light ms-3">LOG</button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-4">
              <p className="text-muted mb-1">Films Starring</p>
              <h1 className="mb-4">Cillian Murphy</h1>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {[1, 2, 3, 4, 5].map((filmNumber) => (
                  <div className="col" key={filmNumber}>
                    <div className="card h-100 border-0 shadow-sm">
                      <img 
                        src={`./images/Film ${filmNumber}.jpg`} 
                        alt={`Film ${filmNumber}`} 
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body p-2">
                        <h5 className="card-title fs-6 mb-0">Film Title {filmNumber}</h5>
                        <p className="card-text text-muted small">202{filmNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <aside className="col-lg-4">
            <div className="card mb-4 border-0 shadow-sm">
              <img 
                src="./images/actor.jpg" 
                className="card-img-top rounded-top" 
                alt="Cillian Murphy" 
              />
              <div className="card-body">
                <h3 className="h5 card-title">Cillian Murphy (born May 25, 1976) is an Irish actor.</h3>
                <p className="card-text">
                  He made his professional debut in Enda Walsh's 1996 play Disco Pigs, a
                  role he later reprised in the 2001 screen adaptation. His notable films
                  include 28 Days Later, The Dark Knight Trilogy, and Peaky Blinders.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ul className="list-inline mb-3">
                {["About", "Pro", "News", "Apps", "Podcast", "Year in Review", "Gifts", "Help", "Terms", "API", "Contact"].map((link, index) => (
                  <li className="list-inline-item me-3 mb-2" key={index}>
                    <a href="#" className="text-white-50 text-decoration-none">{link}</a>
                  </li>
                ))}
              </ul>
              <p className="text-muted small mb-0">
                © MovieRecom Limited. Made by film enthusiasts worldwide. Film
                data from TMDb. Mobile site. <br />
                This site is protected by reCAPTCHA and the Google privacy policy
                and terms of service apply.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="#" className="text-white-50" title="Twitter">
                    <i className="bi bi-twitter fs-5"></i>
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-white-50" title="Facebook">
                    <i className="bi bi-facebook fs-5"></i>
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-white-50" title="Instagram">
                    <i className="bi bi-instagram fs-5"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ActorPage;