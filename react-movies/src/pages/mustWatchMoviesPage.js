import React, { useState, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import SortDropdown from "../components/sortDropdown";
import { sortMovies } from "../util";
import PaginationWrapper from "../components/paginationWrapper";



const MustWatchMoviesPage = () => {
  const [sortBy, setSortBy] = useState("");
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });
  const sortedMovies = sortMovies(movies, sortBy);

  return (
    <>
    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    <PaginationWrapper items={sortedMovies}>
        {(paginatedMovies) => (
    <PageTemplate
      title="Must Watch Movies"
      movies={paginatedMovies}
      action={(movie) => {
        return <RemoveFromMustWatch movie={movie} />;
      }}
    />
  )}
      </PaginationWrapper>
    </>
  );
};

export default MustWatchMoviesPage;
