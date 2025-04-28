// src/pages/HomePage.jsx
import Popular from "../components/popular";
import ContinueWatching from "../components/continueWatching";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HomePage.css";
import TopPicks from "./../components/topPicks";

const HomePage = () => {
  return (
    <>
      <div
        style={{ zIndex: "0" }}
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div
            className="carousel-item main-carousel-item active"
            data-bs-interval="3000"
          >
            <img
              src="src\assets\images\movie1.jpeg"
              className="carouselImg"
              alt="Slide 1"
            />
            <div className="carousel-caption">
              <h1>Fields of Destiny</h1>
              <div className="info">
                <div className="infocap">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#01a227" }}
                  ></i>{" "}
                  8.7
                </div>
                <div className="infocap">2020</div>
                <div className="infocap">+13</div>
              </div>
              <div className="genres">
                <div className="gcontent">Action</div>
                <div className="gcontent">Drama</div>
                <div className="gcontent">Sci-fi</div>
              </div>

              <div className="buttons d-flex justify-content-center align-items-center">
                <button className="btn btn-success me-2 playbutton">
                  <i className="bi bi-play-fill"></i>
                </button>
                <button className="btn btn-outline-light">
                  <i className="fa-solid fa-plus"></i> Add to Watchlist
                </button>
              </div>
            </div>
          </div>
          <div
            className="carousel-item main-carousel-item"
            data-bs-interval="3000"
          >
            <img
              src="src\assets\images\movie2.jpeg"
              className="carouselImg"
              alt="Slide 2"
            />
            <div className="carousel-caption">
              <h1>1917</h1>
              <div className="info">
                <div className="infocap">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#01a227" }}
                  ></i>{" "}
                  8.7
                </div>
                <div className="infocap">2020</div>
                <div className="infocap">+16</div>
              </div>
              <div className="genres">
                <div className="gcontent">Action</div>
                <div className="gcontent">Drama</div>
                <div className="gcontent">Sci-fi</div>
              </div>

              <div className="buttons d-flex justify-content-center align-items-center">
                <button className="btn btn-success me-2 playbutton">
                  <i className="bi bi-play-fill"></i>
                </button>
                <button className="btn btn-outline-light ">
                  <i className="fa-solid fa-plus"></i> Add to Watchlist
                </button>
              </div>
            </div>
          </div>
          <div
            className="carousel-item main-carousel-item"
            data-bs-interval="3000"
          >
            <img
              src="src\assets\images\movie3.jpeg"
              className="carouselImg"
              alt="Slide 2"
            />
            <div className="carousel-caption">
              <h1>John Wick</h1>
              <div className="info">
                <div className="infocap">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#01a227" }}
                  ></i>{" "}
                  8.7
                </div>
                <div className="infocap">2020</div>
                <div className="infocap">+18</div>
              </div>
              <div className="genres">
                <div className="gcontent">Action</div>
                <div className="gcontent">Drama</div>
                <div className="gcontent">Sci-fi</div>
              </div>
              <div className="buttons d-flex justify-content-center align-items-center">
                <button className="btn btn-success me-2 playbutton">
                  <i className="bi bi-play-fill"></i>
                </button>
                <button className="btn btn-outline-light">
                  <i className="fa-solid fa-plus"></i> Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popular />
      <TopPicks />
      <ContinueWatching />
    </>
  );
};

export default HomePage;
