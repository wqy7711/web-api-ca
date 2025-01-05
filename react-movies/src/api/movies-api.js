const baseUrl = 'http://localhost:8080/api';

const getToken = () => {
    return localStorage.getItem('token');
};

const getHeaders = () => {
    const token = getToken();
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
};

export const getMovie = (id) => {
    return fetch(
      `${baseUrl}/movies/tmdb/${id}`, {
        headers: getHeaders()
      }
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  };

export const addToFavorites = (username, movieId) => {
    return fetch(
        `${baseUrl}/users/${username}/favorites`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({ movieId })
        }
    ).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to add to favorites.');
        }
        return response.json();
    });
};

export const removeFromFavorites = (username, movieId) => {
    return fetch(
        `${baseUrl}/users/${username}/favorites/${movieId}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }
    ).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to remove from favorites.');
        }
        return response.json();
    });
};

export const getFavorites = async (username) => {
    const response = await fetch(
      `${baseUrl}/users/${username}/favorites`,
      { headers: getHeaders() }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch favorites.');
    }
  
    const text = await response.text();
    if (!text) {
      return [];
    }
  
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Error parsing favorites JSON:", error);
      throw new Error('Invalid response format for favorites.');
    }
  };

  export const getMustWatch = async (username) => {
    const response = await fetch(
      `${baseUrl}/users/${username}/mustWatch`,
      { headers: getHeaders() }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch mustWatch list.');
    }
  
    return response.json();
  };
  
  export const addToMustWatch = (username, movieId) => {
    return fetch(
      `${baseUrl}/users/${username}/mustWatch`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ movieId }),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add to mustWatch.');
      }
      return response.json();
    });
  };
  
  export const removeFromMustWatch = (username, movieId) => {
    return fetch(
      `${baseUrl}/users/${username}/mustWatch/${movieId}`,
      {
        method: 'DELETE',
        headers: getHeaders(),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove from mustWatch.');
      }
      return response.json();
    });
  };

  export const getMovieReviews = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/movie/${movieId}`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews for movie ID: ${movieId}`);
      }
  
      const data = await response.json();
  
      return Array.isArray(data) ? { results: data } : data;
    } catch (error) {
      console.error("Error fetching movie reviews:", error.message);
      throw error;
    }
  };
  
  

  export const addMovieReview = async (review) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(review),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add movie review.");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error adding movie review:", error.message);
      throw error;
    }
  };
  