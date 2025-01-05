import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import MovieReview from "../components/movieReview";

const MovieReviewsPage = ({ movieId }) => {
  const { myReviews } = useContext(MoviesContext);

  const review = myReviews[movieId];

  if (!review) {
    return <h3>No review available for this movie.</h3>;
  }

  return (
    <div>
      <h3>Review for Movie ID: {movieId}</h3>
      <MovieReview review={review} />
    </div>
  );
};

export default MovieReviewsPage;
