import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  return (
    <div className="bg-dark text-white">
      <nav className="custom-navbar d-flex align-items-center justify-content-between px-4 pe-5">
        <div className="d-flex align-items-center">
          <a className="navbar-brand ms-4" href="#">MovieRecom</a>
          <div className="nav-links d-flex ms-4">
            
            <a href="#" className="nav-link active">For You</a>
            <a href="#" className="nav-link">Drama</a>
            <div className="dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">More</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Movie</a>
                <a className="dropdown-item" href="#">Anime</a>
                <a className="dropdown-item" href="#">Variety Show</a>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section d-flex align-items-center">
          <div className="search-container">
            <input type="text" className="search-box" placeholder="Love is Sweet" />
            <i className="fas fa-search search-icon"></i>
          </div>
          <a href="#" className="nav-link history"><i className="fas fa-clock"></i> History</a>
          <a href="#" className="nav-link language"><i className="fas fa-globe"></i> Language</a>
          <div className="profile-icon me-3">K</div>
          <button className="btn btn-outline-light">APP</button>
          <div className="vip-button">VIP</div>
        </div>
      </nav>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="movie1.jpeg" className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption">
              <h1>The Warrior From Sky</h1>
              <div className="info">
                <div className="infocap"><i className="fa-solid fa-star" style={{ color: '#01a227' }}></i> 8.7</div>
                <div className="infocap">2020</div>
                <div className="infocap">+13</div>
              </div>
              <div className="genres">
                <div className="gcontent">Action</div>
                <div className="gcontent">Drama</div>
                <div className="gcontent">Sci-fi</div>
              </div>
              <p>The ancient warrior reappears, creating the legend of a hero.</p>
              <div className="buttons">
                <i className="fa-solid fa-circle-play playbutton" style={{ color: '#12cd04' }}></i>
                {/* Add SVG component here */}
              </div>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="2000">
            <img src="movie2.webp" className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption">
              <h1>The Warrior From Sky</h1>
              <div className="info">
                <div className="infocap"><i className="fa-solid fa-star" style={{ color: '#01a227' }}></i> 8.7</div>
                <div className="infocap">2020</div>
                <div className="infocap">+13</div>
              </div>
              <div className="genres">
                <div className="gcontent">Action</div>
                <div className="gcontent">Drama</div>
                <div className="gcontent">Sci-fi</div>
              </div>
              <p>The ancient warrior reappears, creating the legend of a hero.</p>
              <div className="buttons">
                <i className="fa-solid fa-circle-play playbutton" style={{ color: '#12cd04' }}></i>
                {/* Add SVG component here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
