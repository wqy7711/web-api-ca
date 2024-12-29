import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies} from '../tmdb-api';
import { getGenres } from '../tmdb-api';


  

const router = express.Router();

router.get('/search', asyncHandler(async (req, res) => {
    let { 
        query = "", 
        genre = "0",
        year = "",
        sort = "popularity", 
        page = 1, 
        limit = 10 
    } = req.query;

    [page, limit] = [+page, +limit]; // Convert to numbers
    const genreId = Number(genre);

    let searchCriteria = {};
    
    if (query) {
        searchCriteria.title = new RegExp(query, 'i');
    }

    if (genreId > 0) {
        searchCriteria.genre_ids = genreId;
    }

    if (year) {
        searchCriteria.release_date = new RegExp(`^${year}`, 'i');
    }

    let sortCriteria = {};
    switch (sort) {
        case 'title_asc':
            sortCriteria.title = 1;
            break;
        case 'title_desc':
            sortCriteria.title = -1;
            break;
        case 'release_date_asc':
            sortCriteria.release_date = 1;
            break;
        case 'release_date_desc':
            sortCriteria.release_date = -1;
            break;
        default:
            sortCriteria.popularity = -1;
    }

    const [total_results, results] = await Promise.all([
        movieModel.countDocuments(searchCriteria),
        movieModel.find(searchCriteria)
            .sort(sortCriteria)
            .limit(limit)
            .skip((page - 1) * limit)
    ]);

    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };

    res.status(200).json(returnObject);
}));

router.get('/tmdb/search', asyncHandler(async (req, res) => {
    const { query, genre, year, page = 1 } = req.query;
    
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    
    if (genre) {
        url += `&with_genres=${genre}`;
    }
    if (year) {
        url += `&year=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
}));

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

  router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));


export default router;
