import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkLocation = useRef(location.state?.from || 'movies/:movieId');

  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = '38a9b8a7f2d4daceaf0a66d3161bb6c0';

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );

        setMovie(response.data);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {movie ? (
        <>
        <div className={css.goBack}>
         <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className={css.icon}
      >
        <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"/>
      </svg>

          <Link to={backLinkLocation.current} className={css.backLink}>
            Go back
          </Link>
          </div>
          <div className={css.movieInfo}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={css.movieImage}
              />
            ) : (
              <p>No poster available</p>
            )}
            <section className={css.infoSection}>
              <h2>{movie.title}</h2>
              <p className={css.userScore}>
                User score:{' '}
                <span className={css.userScoreQuery}>{movie.vote_average}</span>
              </p>
              <h3 className={css.overview}>
                Overview <br />
                <span className={css.overViewText}>{movie.overview}</span>
              </h3>
              <p className={css.genres}>
                Genres <br />{' '}
                <span className={css.genresText}>
                  {movie.genres
                    ? movie.genres.map(genre => genre.name).join(' ')
                    : 'Unknown'}
                </span>
              </p>
            </section>
          </div>
          <div className={css.additionalInfo}>
            <p className={css.addInfo}>Additional information</p>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense>
          <Outlet />
          </Suspense>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetails;
