import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import css from './Home.module.css';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      const apiKey = '38a9b8a7f2d4daceaf0a66d3161bb6c0';

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );

        const newMovies = response.data.results;

        setMovies(newMovies);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };
    fetchMovieList();
  }, []);

  return (
    <div className={css.homeContainer}>
      <h1 className={css.homeTitle}>Trending today</h1>
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
