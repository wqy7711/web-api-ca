import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../contexts/authContext";
import { removeFromFavorites } from '../../api/movies-api';

const RemoveFromFavoritesIcon = ({ movie, onFavoriteRemoved }) => {
  const { user } = useAuth();

  const handleRemove = async () => {
    try {
      if (user) {
        await removeFromFavorites(user.username, movie.id);
        if (onFavoriteRemoved) {
          onFavoriteRemoved(movie.id);
        }
      }
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemove}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
