import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { addToMustWatch } from '../../api/movies-api';
import { useAuth } from "../../contexts/authContext";

const AddToMustWatchIcon = ({ movie }) => {
  const { user } = useAuth();

  const handleAddToMustWatch = async (e) => {
    e.preventDefault();
    try {
      await addToMustWatch(user.username, movie.id);
      alert("Movie added to Must Watch!");
    } catch (error) {
      console.error("Failed to add to must watch:", error);
    }
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
