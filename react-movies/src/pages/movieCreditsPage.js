import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";


const MovieCreditsPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id }],
    () => getMovieCredits(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const { cast, crew } = data;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((member) => (
          <Grid key={member.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/actor/${member.id}`}>
              <Avatar
                src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                alt={member.name}
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <Typography variant="h6" align="center">
                {member.name}
              </Typography>
              <Typography variant="body2" align="center">
                as {member.character}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default MovieCreditsPage;
