import { useEffect, useState } from "react";
import Popular from "../components/popular";
import TopPicks from "./../components/topPicks";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HomePage.css";
import {
  BASE_URL,
  API_KEY,
  BACKDROP_PATH,
  getGenreNames,
} from "../constants/constants";
import { ClipLoader } from "react-spinners";
import OnAir from "../components/onAir";
import NowPlaying from "../components/NowPlaying";
import UpComing from "../components/UpComing";

const HomePage = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        // Limit to 5 items for the carousel
        setTrendingItems(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending items:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="container">
      
      {loading?(
        <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
    <ClipLoader color="var(--secondary-color)" size={60} />
  </div>
        </>
      ):( 
        <>
        <div
        id="carouselExampleFade"
        className="carousel slide auto-play carousel-fade  py-0"
        data-bs-ride="carousel"
        data-bs-interval="3000" // This sets the interval for auto-play globally
      >
        <div className="carousel-indicators">
          {trendingItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {trendingItems.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={`${BACKDROP_PATH}${item.backdrop_path}`}
                className="d-block w-100"
                alt={item.title || item.name}
              />
              <div className="carousel-caption">
                <h1  style={{color:'var(--secondary-color)'}}>{item.title || item.name}</h1>
                <div className="info">
                  <div className="infocap">
                    <i
                      className="fa-solid fa-star me-2"
                      style={{ color: "gold" }}
                    ></i>{" "}
                    {typeof item.vote_average === "number"
                      ? item.vote_average.toFixed(1)
                      : ""}
                  </div>
                  <div className="infocap">
                    {new Date(
                      item.release_date || item.first_air_date
                    ).getFullYear()}
                  </div>
                  <div className="infocap">+13</div>
                </div>
                <div className="genres">
                  {getGenreNames(item.genre_ids, item)
                    .slice(0, 3)
                    .map((genre) => (
                      <div  key={genre} className="gcontent bg-transparent ">
                        {genre}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon ms-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon me-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </>
    )}

      <NowPlaying/>
      <TopPicks />
      <UpComing/>
      <Popular />
      <OnAir/>
    </div>
  );
};

export default HomePage;
