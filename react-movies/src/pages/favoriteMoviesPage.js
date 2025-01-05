import React, { useState, useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useAuth } from "../contexts/authContext";
import { getFavorites } from "../api/movies-api";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { user } = useAuth();
  const context = useContext(MoviesContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
  
        if (user) {
          const favoriteMovies = await getFavorites(user.username);
          console.log("Fetched favorite movies:", favoriteMovies);
  
          if (Array.isArray(favoriteMovies) && favoriteMovies.length > 0) {
            setFavorites(favoriteMovies);
          } else {
            setFavorites([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch favorite movies:", err);
        setError("Failed to load favorite movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavorites();
  }, [user]);

  const handleFavoriteRemoved = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
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
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie}
          onFavoriteRemoved={handleFavoriteRemoved} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;