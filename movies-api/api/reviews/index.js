import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate';

const router = express.Router();

// Get all reviews for a movie
router.get('/movie/:id', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id);
    const reviews = await Review.findByMovieId(movieId);
    res.status(200).json(reviews);
}));

// Get a specific review
router.get('/:id', asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        res.status(200).json(review);
    } else {
        res.status(404).json({
            message: 'The review you requested could not be found.',
            status_code: 404
        });
    }
}));

// Get all reviews by a user
router.get('/user/:userId', authenticate, asyncHandler(async (req, res) => {
    const reviews = await Review.findByUserId(req.params.userId);
    res.status(200).json(reviews);
}));

// Create a new review
router.post('/', authenticate, asyncHandler(async (req, res) => {
    if (!req.body.movieId || !req.body.content || !req.body.rating) {
        res.status(400).json({
            message: 'Movie ID, content and rating are required',
            status_code: 400
        });
        return;
    }

    const review = new Review({
        movieId: parseInt(req.body.movieId),
        author: req.body.author,
        content: req.body.content,
        rating: req.body.rating,
        userId: req.user._id
    });
    
    await review.save();
    res.status(201).json(review);
}));

// Update a review
router.put('/:id', authenticate, asyncHandler(async (req, res) => {
    if (!req.body.content && !req.body.rating) {
        res.status(400).json({
            message: 'Content or rating is required for update',
            status_code: 400
        });
        return;
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(404).json({
            message: 'Review not found',
            status_code: 404
        });
        return;
    }

    if (review.userId.toString() !== req.user._id.toString()) {
        res.status(403).json({
            message: 'Unauthorized to update this review',
            status_code: 403
        });
        return;
    }

    if (req.body.content) review.content = req.body.content;
    if (req.body.rating) review.rating = req.body.rating;

    await review.save();
    res.status(200).json(review);
}));

// Delete a review
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(404).json({
            message: 'Review not found',
            status_code: 404
        });
        return;
    }

    if (review.userId.toString() !== req.user._id.toString()) {
        res.status(403).json({
            message: 'Unauthorized to delete this review',
            status_code: 403
        });
        return;
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
}));

export default router;