import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieRecommendations } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import SortDropdown from "../components/sortDropdown";
import { sortMovies } from "../util";
import PaginationWrapper from "../components/paginationWrapper";

const MovieRecommendationsPage = () => {
  const [sortBy, setSortBy] = useState("");
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["recommendations", { id }],
    () => getMovieRecommendations(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const sortedMovies = sortMovies(data.results, sortBy);

  return (
    <>
    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    <PaginationWrapper items={sortedMovies}>
        {(paginatedMovies) => (
    <PageTemplate
      title="Recommended Movies"
      movies={paginatedMovies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToMustWatchIcon movie={movie} />
        </>
      )}
    />
  )}
      </PaginationWrapper>
    </>
  );
};

export default MovieRecommendationsPage;
