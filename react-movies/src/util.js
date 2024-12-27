import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function sortMovies(movies, sortBy) {
  if (!movies || !sortBy) return movies;

  return [...movies].sort((a, b) => {
    switch (sortBy) {
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      case "releaseDateAsc":
        return new Date(a.release_date) - new Date(b.release_date);
      case "releaseDateDesc":
        return new Date(b.release_date) - new Date(a.release_date);
      default:
        return 0;
    }
  });
}

