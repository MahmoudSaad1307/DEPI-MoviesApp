// src/pages/HomePage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="bg-dark text-white">
      {/* Carousel Section */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
