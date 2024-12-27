import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import SortDropdown from "../components/sortDropdown";
import { sortMovies } from "../util";
import PaginationWrapper from "../components/paginationWrapper";

const HomePage = (props) => {

  const [sortBy, setSortBy] = useState("");
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const sortedMovies = sortMovies(data.results, sortBy);

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // eslint-disable-next-line no-unused-vars
  const addToFavorites = (movieId) => true 

  return (
    <>
    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    <PaginationWrapper items={sortedMovies}>
        {(paginatedMovies) => (
    <PageTemplate
      title="Discover Movies"
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
export default HomePage;

