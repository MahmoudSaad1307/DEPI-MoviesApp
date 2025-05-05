export const API_KEY = "4464a9cd6c3e0ee26ee5e6a893515421";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w440_and_h660_face";
export const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";


// export const API_URL = 'https://diplomatic-kris-malik1307-9371a6ef.koyeb.app/api'; 
export const API_URL = 'http://localhost:3000/api'; 




export const MOVIE_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const TV_GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];
export const ENDPOINTS = {
  movies: {
    popular: "/movie/popular",
    topRated: "/movie/top_rated",
    nowPlaying: "/movie/now_playing",
    upcoming: "/movie/upcoming",
    details: (id) => `/movie/${id}`,
    credits: (id) => `/movie/${id}/credits`,
    similar: (id) => `/movie/${id}/similar`,
    videos: (id) => `/movie/${id}/videos`,
    reviews: (id) => `/movie/${id}/reviews`,
    search: "/search/movie",
  },
  tv: {
    popular: "/tv/popular",
    topRated: "/tv/top_rated",
    onTheAir: "/tv/on_the_air",
    airingToday: "/tv/airing_today",
    details: (id) => `/tv/${id}`,
    credits: (id) => `/tv/${id}/credits`,
    similar: (id) => `/tv/${id}/similar`,
    videos: (id) => `/tv/${id}/videos`,
    reviews: (id) => `/tv/${id}/reviews`,
    seasonDetails: (tvId, seasonNumber) => `/tv/${tvId}/season/${seasonNumber}`,
    search: "/search/tv",
  },
  person: {
    details: (id) => `/person/${id}`,
    movieCredits: (id) => `/person/${id}/movie_credits`,
    tvCredits: (id) => `/person/${id}/tv_credits`,
    search: "/search/person",
  },
  multiSearch: "/search/multi",
};
export const getGenreNames = (genreIds, movie) => {
  if (!genreIds || genreIds.length === 0) return [];

  const genres = movie.media_type === "movie" ? MOVIE_GENRES : TV_GENRES;
  return genreIds
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);
};

export async function fetchMovies(endPoint, query, pageNumber) {
  try {
    const response = await fetch(
      `${BASE_URL + endPoint}?api_key=${
        API_KEY + query
      }&language=en-US&page=${pageNumber}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

