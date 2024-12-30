import express from 'express';
import Actor from './actorModel';
import asyncHandler from 'express-async-handler';
import { getActorDetails, getActorMovies } from '../tmdb-api';

const router = express.Router();

// Get actor details from TMDB
router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await getActorDetails(id);
    res.status(200).json(actor);
}));

// Get actor movies from TMDB
router.get('/tmdb/:id/movies', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getActorMovies(id);
    res.status(200).json(movies);
}));

// Get actor details from our DB
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await Actor.findByTMDBId(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({
            message: 'The actor you requested could not be found.',
            status_code: 404
        });
    }
}));

// Get actor movies from our DB
router.get('/:id/movies', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await Actor.findByTMDBId(id);
    if (actor && actor.movie_credits) {
        res.status(200).json(actor.movie_credits);
    } else {
        res.status(404).json({
            message: 'The actor movies could not be found.',
            status_code: 404
        });
    }
}));

// Cache actor data to our DB
router.post('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Get actor details and movies from TMDB
    const [actorDetails, actorMovies] = await Promise.all([
        getActorDetails(id),
        getActorMovies(id)
    ]);
    
    // Format movie credits
    const movieCredits = actorMovies.cast.map(movie => ({
        movieId: movie.id,
        character: movie.character,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path
    }));

    // Create or update actor in our DB
    const actor = await Actor.findOneAndUpdate(
        { id: id },
        {
            ...actorDetails,
            movie_credits: movieCredits
        },
        { upsert: true, new: true }
    );

    res.status(201).json(actor);
}));

export default router;