import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDJlOTJkZTAxYTc5ZmIyY2UwZTU4NmE0MGUyYTJmMSIsInN1YiI6IjY0YTMyMWVjMTEzODZjMDBjNTkxMmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QRsBW310t8sTZasX2uRFdRsKwjgQeAQ4xTo8GdCIXSE",
    },
  };

  let navigate = useNavigate()
  const [movies, setMovies] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchMovies() {
    const { data } = await axios.get("https://api.themoviedb.org/3/movie/popular?language=en", options);
    const results = await data.results.slice(0, 6);
    setMovies(results);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovies()
  }, []);

  async function searchMovies() {
    setLoading(true);
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchId}`, options);
    const results = await data.results;
    setMovies(results);
    setLoading(false);
    setSearchId("");
  }

  function onSearchKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      searchMovies();
    }
  }

  return (
    <>
      <header>
        <img src={logo} alt="" className="header__logo" />
        <h3 className="header__logo--sub-title">A directory of all movies ever made.</h3>
        <div className="header__title--container">
          <div className="header__title--group">
            <h1 className="header__title">Lights</h1>
            <i className="fa-solid header__title--icon fa-lightbulb"></i>
          </div>
          <div className="header__title--group">
            <h1 className="header__title">Camera</h1>
            <i className="fa-solid header__title--icon fa-video"></i>
          </div>
          <div className="header__title--group">
            <h1 className="header__title">Action</h1>
            <i className="fa-solid header__title--icon fa-clapperboard"></i>
          </div>
        </div>
        <h3 className="header__sub-title">Unleash Your Reel Potential.</h3>
        <form className="header__search--container">
          <input className="header__search--bar" id="searchInput" placeholder="Search For Movies" value={searchId} onChange={(event) => setSearchId(event.target.value)} onKeyDown={onSearchKeyPress} />
          <button className="header__search--button" type="button" onClick={searchMovies}>
            Search
          </button>
        </form>
      </header>
      <section id="landing">
        <h2 className="landing__title">Recommended</h2>
        <ul className="movie__list">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            movies.map((movie) =>
              movie.poster_path ? (
                <li className="movie" key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="movie__image" />
                  <div className="movie__description">
                    <h3 className="movie__title">{movie.title}</h3>

                    <div className="movie__description--wrapper">
                      <h3 className="movie__released">{movie.release_date.slice(0, 4)}</h3>

                      <div className="movie__rating--wrapper">
                        <h3 className="movie__rating">{Math.round(10 * movie.vote_average) / 10}/10</h3>
                        <h4 className="movie__rating--label">Rating</h4>
                      </div>
                    </div>

                    <button className="movie__button" onClick={() => navigate(`${movie.id}`)}>View More</button>
                  </div>
                </li>
              ) : null
            )
          )}
        </ul>
      </section>
      <Footer></Footer>
    </>
  );
}
