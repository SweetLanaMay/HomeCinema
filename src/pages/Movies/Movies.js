import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import css from './Movies.module.css';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') ?? '';

  const fetchMovieList = async () => {
    const apiKey = '38a9b8a7f2d4daceaf0a66d3161bb6c0';

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );

      const newMovies = response.data.results;

      setMovies(newMovies);
      setIsLoading(false);

    } catch (error) {
      console.log('Error:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    fetchMovieList();
    // eslint-disable-next-line
  }, []);

  const formHandler = event => {
    event.preventDefault();
    fetchMovieList();
  };

  const updateQueryString = event => {
    const value = event.target.value;

    if (value === '') {
      setSearchParams({});
    } else {
      setSearchParams({ query: value });
    }
  };

  return (
    <>
    <form  onSubmit={formHandler}className={css.searchForm}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Enter movie name"
        value={query}
        onChange={updateQueryString}
      />
      <button type="submit" className={css.searchButton}>
        <span className={css.buttonLabel}>Search</span>
      </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={css.movieList}>
          {movies.map(movie => (
            <li key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </>
  );
};

export default Movies;
