import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import { getMustWatch, getMovie } from "../api/movies-api";
import { useAuth } from "../contexts/authContext";

const MustWatchMoviesPage = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMustWatch = async () => {
      try {
        setLoading(true);
        const movieIds = await getMustWatch(user.username);
        const movieDetails = await Promise.all(
          movieIds.map((id) => getMovie(id))
        );
        setMovies(movieDetails);
      } catch (err) {
        console.error("Failed to fetch must watch movies:", err);
        setError("Failed to load must watch movies.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMustWatch();
    }
  }, [user]);

  const handleMovieRemoved = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => (
        <RemoveFromMustWatch
          movie={movie}
          onRemoved={handleMovieRemoved}/>
      )}
    />
  );
};

export default MustWatchMoviesPage;
