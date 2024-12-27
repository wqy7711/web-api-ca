import React from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

const SortDropdown = ({ sortBy, setSortBy }) => {
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortBy}
        onChange={handleChange}
      >
        <MenuItem value="titleAsc">Title (A-Z)</MenuItem>
        <MenuItem value="titleDesc">Title (Z-A)</MenuItem>
        <MenuItem value="releaseDateAsc">Release Date (Oldest First)</MenuItem>
        <MenuItem value="releaseDateDesc">Release Date (Newest First)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
