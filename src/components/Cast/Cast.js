import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import css from './Cast.module.css';
import defaultImg from '../../images/anonymous_avatars_grey_circles.jpg';

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
    <div className={css.castContainer}>
      <h2 className={css.castTitle}>Cast</h2>
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
              <img
                src={defaultImg}
                alt="Actor profile"
                className={css.defaultImg}
              />
            )}

            <p className={css.character}>
              Character:{' '}
              <span className={css.characterName}>{actor.character}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string,
};

export default Cast;
