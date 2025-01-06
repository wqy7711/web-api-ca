import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getMovie,
    discoverMovies,
    getUpcomingMovies,
    getGenres,
    getMovieRecommendations,
    getSimilarMovies,
    getTrendingMovies,
    getNowPlayingMovies,
    searchMovies,
    getMovieCredits,
    getMovieImages,
    getMovieReviews
} from '../tmdb-api';

const router = express.Router();

// TMDB API routes
router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
        const data = await discoverMovies(page);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    try {
        const data = await getUpcomingMovies();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    try {
        const data = await getTrendingMovies();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    try {
        const data = await getNowPlayingMovies();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const data = await getGenres();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/search', async (req, res) => {
    try {
        const { query, genre, year, page } = req.query;
        const result = await searchMovies(query, genre, year, page);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch search results." });
    }
});

router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    try {
        const movie = await getMovie(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/:id/recommendations', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    try {
        const data = await getMovieRecommendations(id, page);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/:id/similar', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    try {
        const data = await getSimilarMovies(id, page);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/:id/credits', asyncHandler(async (req, res) => {
    try {
        const data = await getMovieCredits(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/tmdb/:id/images', asyncHandler(async (req, res) => {
    try {
        const data = await getMovieImages(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));


// Database routes
router.get('/', asyncHandler(async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        [page, limit] = [+page, +limit];

        const [total_results, results] = await Promise.all([
            movieModel.estimatedDocumentCount(),
            movieModel.find().limit(limit).skip((page - 1) * limit)
        ]);
        const total_pages = Math.ceil(total_results / limit);

        res.status(200).json({
            page,
            total_pages,
            total_results,
            results
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await movieModel.findByMovieDBId(id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({
                message: 'The movie you requested could not be found.',
                status_code: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message || 'Internal server error'
        });
    }
}));

export default router;