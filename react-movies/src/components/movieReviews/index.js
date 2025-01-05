import React from "react";
import { useQuery } from "react-query";
import { getMovieReviews } from '../../api/movies-api';
import Spinner from '../spinner';


const MovieReviews = ({ movieId }) => {
  const { data: reviewsData, isLoading, error } = useQuery(
    ["reviews", { id: movieId }],
    () => getMovieReviews(movieId),
    { enabled: !!movieId }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        Failed to fetch reviews: {error.message || "Unknown error"}
      </p>
    );
  }

  const reviews = reviewsData?.results || [];

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
          <p>Created At: {new Date(review.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReviews;
