import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCastInfo = async () => {
      const apiKey = '38a9b8a7f2d4daceaf0a66d3161bb6c0';
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );

        const castData = response.data.cast;
        setCast(castData);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchCastInfo();
  }, [movieId]);
  return (
    <div>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <p className={css.actorName}>{actor.name}</p>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                className={css.castImage}
              />
            ) : (
              <p>No profile available</p>
            )}

            <p className={css.characterName}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cast;
