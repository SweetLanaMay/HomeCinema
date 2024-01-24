import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const apiKey = '38a9b8a7f2d4daceaf0a66d3161bb6c0';
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );

        setReviews(response.data.results);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchMovieReviews();
  }, [movieId]);
  return (
    <div className={css.reviewsContainer}>
      <h2 className={css.reviewsTitle}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={css.reviewsText}>No reviews found for this movie.</p>
      ) : (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewsItem}>
              <h3 className={css.reviewsAuthor}>{review.author}</h3>
              <p className={css.reviewsContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string,
};

export default Reviews;
