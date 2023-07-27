import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

export default function Movie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDJlOTJkZTAxYTc5ZmIyY2UwZTU4NmE0MGUyYTJmMSIsInN1YiI6IjY0YTMyMWVjMTEzODZjMDBjNTkxMmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QRsBW310t8sTZasX2uRFdRsKwjgQeAQ4xTo8GdCIXSE",
    },
  };

  let navigate = useNavigate()

  const { id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMovieData() {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
    setMovieData([data]);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <>
      <button onClick={() => navigate(`/`)}>Back</button>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        movieData.map((movie) => (
          <div className="movie__single" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Poster" className="movie__image--single" />
            <div className="movie__description">
              <h3 className="movie__title--single">{movie.title}</h3>
              <h4>{movie.tagline}</h4>

              <div className="movie__description--wrapper">
                <h3 className="movie__released">{movie.release_date.slice(0, 4)}</h3>

                <div className="movie__rating--wrapper">
                  <h3 className="movie__rating">{Math.round(10 * movie.vote_average) / 10}/10</h3>
                  <h4 className="movie__rating--label">Rating</h4>
                </div>
              </div>
              <p className="movie__para">{movie.overview}</p>
              <h4 className="movie__budget">Budget: {movie.budget}</h4>
            </div>
          </div>
        ))
      )}
      <Footer></Footer>
    </>
  );
}
