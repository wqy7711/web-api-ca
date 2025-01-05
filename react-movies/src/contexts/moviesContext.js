import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )

  const [mustWatch, setMustWatch] = useState([]);

  const [myReviews, setMyReviews] = useState( {} ) 

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(id => id !== movieId));
  };


  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
      console.log(newMustWatch);
    }
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  const addReview = async (movie, review) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ movieId: movie.id, ...review }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
  
      setMyReviews({ ...myReviews, [movie.id]: review });
    } catch (error) {
      console.error("Error adding review:", error.message);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;