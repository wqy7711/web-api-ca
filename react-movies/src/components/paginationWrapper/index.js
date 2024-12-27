import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";

const PaginationWrapper = ({ items, itemsPerPage = 3, children }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {children(paginatedItems)} {}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </>
  );
};

export default PaginationWrapper;
