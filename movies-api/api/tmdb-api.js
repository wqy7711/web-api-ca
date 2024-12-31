import fetch from 'node-fetch';


export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

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

// Get movie recommendations from TMDB 
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

// Get similar movies from TMDB
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


