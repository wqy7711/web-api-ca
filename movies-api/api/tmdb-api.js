import fetch from 'node-fetch';


// Movies API
export const getMovie = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movie with ID ${movieId}`);
      }
  
      const movieData = await response.json();
      return movieData;
    } catch (error) {
      console.error("Error fetching movie:", error.message);
      throw error;
    }
  };

export const discoverMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getNowPlayingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieCredits = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieRecommendations = async (movieId, page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getSimilarMovies = async (movieId, page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Genres API
export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Search API
export const searchMovies = async (query, genre, year, page = 1) => {
    try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
        
        if (genre) {
            url += `&with_genres=${genre}`;
        }
        if (year) {
            url += `&year=${year}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Actor API
export const getActorDetails = async (actorId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getActorMovies = async (actorId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

