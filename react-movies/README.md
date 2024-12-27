# Assignment 1 - ReactJS app.

Name： QiYi Wang

## Overview.

This repository contains the Movies Fan App, a ReactJS application for browsing and managing movie-related data.  The app provides functionality such as adding movies to favorite or must-watch lists, viewing recommendations, exploring cast details, and managing user authentication.  It integrates The Movie Database (TMDB) API for dynamic content and Firebase Authentication for user management.

### Features.

+ Favorite and Must-Watch Management
+ Movie Recommendations and Credits
+ Sorting and Filtering
+ Pagination
+ Movie Reviews
+ Authentication
+ Dynamic Routing
+ Responsive Design

## Setup requirements.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## API endpoints.

+ Discover Movies: /discover/movie
+ Movie Details: /movie/:id
+ Genres: /genre/movie/list
+ Upcoming Movies: /movie/upcoming
+ Trending Movies: /trending/movie/day
+ Now Playing Movies: /movie/now_playing
+ Movie Recommendations: /movie/:id/recommendations
+ Movie Credits: /movie/:id/credits
+ Actor Details: /person/:id
+ Actor Movie Credits: /person/:id/movie_credits

## Routing.

+ / - Homepage displaying discoverable movies.
+ /login - Login page for user authentication.
+ /register - Registration page for new users.
+ /movies/favorites - Displays favorite movies (protected route).
+ /movies/must_watch - Displays must-watch movies (protected route).
+ /movies/upcoming - Shows a list of upcoming movies​.
+ /movies/trending/today - Displays trending movies for the day.
+ /movies/now_playing - Displays movies currently playing in theaters.
+ /movie/:id - Displays detailed information about a specific movie.
+ /movie/:id/recommendations - Displays movie recommendations for a selected movie.
+ /movie/:id/credits - Shows the cast and crew of the movie.
+ /actor/:id - Displays details about an actor, including movies they are known for.

## Independent learning.

During the development of the Movies App, independent research was conducted to integrate advanced features and improve the user experience.  This included implementing Firebase Authentication for secure user login and registration, utilizing React Query for efficient API data fetching and caching, and leveraging Material-UI for modern, responsive component styling.  Pagination logic was designed for seamless navigation through large datasets, and reusable contexts were created to manage state effectively across the application.  These technologies, along with thorough exploration of online resources and documentation, enhanced the app’s functionality and maintainability .
