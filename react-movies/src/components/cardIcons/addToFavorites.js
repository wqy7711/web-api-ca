import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../contexts/authContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavorites } from '../../api/movies-api';

const AddToFavoritesIcon = ({ movie, username }) => {
  const context = useContext(MoviesContext);
  const { user } = useAuth();

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await addToFavorites(user.username, movie.id);
        context.addToFavorites(movie);
      }
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;