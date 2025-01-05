import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import authenticate from '../../authenticate';
import { getMovie } from "../tmdb-api";


const router = express.Router(); // eslint-disable-line


router.post('/:userName/favorites', authenticate, asyncHandler(async (req, res) => {
    const userName = req.params.userName;
    const { movieId } = req.body;
    
    if (!movieId) {
        return res.status(400).json({ code: 400, msg: 'Movie id is required.' });
    }

    const user = await User.addFavorite(userName, movieId);
    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    
    res.status(200).json({ code: 200, msg: 'Movie added to favorites.', user });
}));

router.delete('/:userName/favorites/:movieId', authenticate, asyncHandler(async (req, res) => {
    const userName = req.params.userName;
    const movieId = Number(req.params.movieId);

    const user = await User.removeFavorite(userName, movieId);
    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    res.status(200).json({ code: 200, msg: 'Movie removed from favorites.', user });
}));

router.get(
    "/:userName/favorites",
    asyncHandler(async (req, res) => {
      const { userName } = req.params;
  
      const user = await User.findOne({ username: userName }).select("favorites");
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const favoriteIds = user.favorites || [];
      console.log("Fetched favorite IDs:", favoriteIds);
  
      try {
        const moviePromises = favoriteIds.map((id) => getMovie(id));
        const movies = await Promise.all(moviePromises);
        console.log("Fetched movies:", movies);
  
        res.status(200).json(movies);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
        res.status(500).json({ message: "Failed to fetch favorite movies." });
      }
    })
  );

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}



export default router;