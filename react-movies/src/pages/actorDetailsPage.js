import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const ActorDetailsPage = () => {
  const { actorId } = useParams();

  const { data: actor, error: actorError, isLoading: actorLoading, isError: isActorError } = useQuery(
    ["actorDetails", { id: actorId }],
    () => getActorDetails(actorId)
  );

  const { data: movies, error: moviesError, isLoading: moviesLoading, isError: isMoviesError } = useQuery(
    ["actorMovies", { id: actorId }],
    () => getActorMovies(actorId)
  );

  if (actorLoading || moviesLoading) {
    return <Spinner />;
  }

  if (isActorError || isMoviesError) {
    return <h1>{actorError?.message || moviesError?.message}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {actor.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {actor.biography || "No biography available."}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Known for:
      </Typography>
      <Grid container spacing={2}>
        {movies.cast.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/movies/${movie.id}`}>
              <Typography variant="body2" align="center">
                {movie.title}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActorDetailsPage;



