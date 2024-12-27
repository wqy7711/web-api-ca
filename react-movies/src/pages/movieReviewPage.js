import React from "react";
import { useParams, useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { useQuery, useQueryClient } from "react-query";
import { getMovie, getMovieReviews } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const MovieReviewPage = () => {
  const { id: reviewId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();

  const initialReview = location.state?.review;
  const initialMovie = location.state?.movie;

  const cachedMovie = queryClient.getQueryData(["movie", { id: initialMovie?.id }]);

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery(
    ["reviews", { id: initialMovie?.id }],
    () => getMovieReviews(initialMovie.id),
    { enabled: !!initialMovie }
  );

  const { data: movieData, isLoading: movieLoading } = useQuery(
    ["movie", { id: initialMovie?.id }],
    () => getMovie(initialMovie.id),
    { enabled: !!initialMovie && !cachedMovie }
  );

  if (reviewsLoading || movieLoading) {
    return <Spinner />;
  }

  const movie = cachedMovie || movieData || initialMovie;
  const review =
    initialReview ||
    reviewsData?.results.find((r) => r.id === reviewId);

  if (!movie || !review) {
    return <h1>Data is missing</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
