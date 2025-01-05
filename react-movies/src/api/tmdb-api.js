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

export const getMovies = () => {
  return fetch(
    `${baseUrl}/movies/tmdb/discover`, {
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
    console.error('Error fetching movies:', error);
    throw error;
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
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

export const getGenres = () => {
  return fetch(
    `${baseUrl}/movies/tmdb/genres`, {
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

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}/movies/tmdb/${id}/images`, {
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

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}/movies/tmdb/${id}/reviews`, {
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

export const getUpcomingMovies = () => {
  return fetch(
    `${baseUrl}/movies/tmdb/upcoming`, {
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

export const getTrendingMovies = () => {
  return fetch(
    `${baseUrl}/movies/tmdb/trending`, {
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

export const getNowPlayingMovies = () => {
  return fetch(
    `${baseUrl}/movies/tmdb/now_playing`, {
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

export const getMovieRecommendations = (id) => {
  return fetch(
    `${baseUrl}/movies/tmdb/${id}/recommendations`, {
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

export const getMovieCredits = (id) => {
  return fetch(
    `${baseUrl}/movies/tmdb/${id}/credits`, {
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

export const getActorDetails = (actorId) => {
  return fetch(
    `${baseUrl}/actors/tmdb/${actorId}`, {
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

export const getActorMovies = (actorId) => {
  return fetch(
    `${baseUrl}/actors/tmdb/${actorId}/movies`, {
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