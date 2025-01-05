import React from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { removeFromMustWatch } from "../../api/movies-api";
import { useAuth } from "../../contexts/authContext";

const RemoveFromMustWatch = ({ movie, onRemoved }) => {
  const { user } = useAuth();

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await removeFromMustWatch(user.username, movie.id);
      if (onRemoved) {
        onRemoved(movie.id);
      }
    } catch (error) {
      console.error("Failed to remove from must watch:", error);
    }
  };

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={handleRemove}
    >
      <PlaylistRemoveIcon color="primary" />
    </IconButton>
  );
};

export default RemoveFromMustWatch;
