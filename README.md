# Assignment 2 - Web API.

Name: QiYi Wang

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Login/Register system with JWT token 
 + Password encryption using bcrypt
 + Protected routes requiring authentication
 + Token-based session management
 + Favorite movies management (add/remove/view)
 + Must Watch list management (add/remove/view)
 + User-specific movie reviews
 + Personalized user profile data storage
 + Local caching of TMDB data
 + Advanced movie searching and filtering
 + Movie recommendations and similar movies
 + Comprehensive movie details with cast information
 + Actor details caching
 + Actor filmography tracking
 + Actor biography and details storage
 + Integration with movie cast information



## Setup requirements.

Install Node.js and npm
Install MongoDB locally or have a MongoDB Atlas account
Clone the repository
Run npm install in both the API and React app directories
Set up environment variables in .env file
Run npm start and npm run dev

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.
Create a .env file in the root of the project with the following variables:
______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoURL
TMDB_KEY=YourTMDBAPIKey
SECRET=YourJWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/users | GET | Gets all users
- /api/users | POST | Create/authenticate a user
- /api/users/:username/favorites | GET | Get user's favorite movies
- /api/users/:username/favorites | POST | Add a movie to favorites
- /api/users/:username/favorites/:movieId | DELETE | Remove movie from favorites
- /api/users/:username/mustWatch | GET | Get user's must watch list
- /api/users/:username/mustWatch | POST | Add movie to must watch list
- /api/users/:username/mustWatch/:movieId | DELETE | Remove from must watch list
- /api/movies/tmdb/discover | GET | Gets a list of movies
- /api/movies/tmdb/:id | GET | Gets a single movie
- /api/movies/tmdb/upcoming | GET | Gets upcoming movies
- /api/movies/tmdb/trending | GET | Gets trending movies
- /api/movies/tmdb/now_playing | GET | Gets now playing movies
- /api/movies/tmdb/:id/recommendations | GET | Gets movie recommendations
- /api/movies/tmdb/:id/similar | GET | Gets similar movies
- /api/movies/tmdb/:id/credits | GET | Gets movie credits
- /api/movies/tmdb/:id/images | GET | Gets movie images
- /api/actors/tmdb/:id | GET | Gets actor details
- /api/actors/tmdb/:id/movies | GET | Gets actor's movies
- /api/actors/:id | GET | Gets cached actor details
- /api/actors/:id | POST | Cache actor details
- /api/actors/:id/movies | GET | Gets cached actor movies
- /api/reviews/movie/:id | GET | Gets all reviews for a movie
- /api/reviews/:id | GET | Gets a specific review
- /api/reviews | POST | Creates a new review
- /api/reviews/:id | PUT | Updates a review
- /api/reviews/:id | DELETE | Deletes a review
- /api/reviews/user/:userId | GET | Gets all reviews by a user


## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.
authenticate/index.js
## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.
integrate my React app with the API:
All movie data fetching now goes through our API
User authentication integrated
Favorite and Must Watch features using local database
Review system using local storage
Actor information caching
updates to the React app:
Home page
Movie details
Actor details
User favorites
Must watch list
Review management

## Independent learning (if relevant)

In this project, I mainly learned and implemented the following contents: learned and implemented the JWT authentication mechanism, including token generation, verification and management; The MongoDB database model is designed and implemented to deal with the relationship between users, movies and reviews. Developed custom Express middleware for error handling and request validation; TMDB API is integrated to realize local data caching and synchronization. The mastery of these knowledge has significantly improved my understanding of React and API, and strengthened my project development ability.
