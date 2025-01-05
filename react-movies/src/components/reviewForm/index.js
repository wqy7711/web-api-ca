import React, { useState } from "react";
import { addMovieReview } from "../../api/movies-api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ReviewForm = ({ movie }) => {
  const [review, setReview] = useState({ author: "", content: "", rating: 3 });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovieReview({ ...review, movieId: movie.id });
      setOpen(true);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", alignItems: "center", margin: "20px" }}>
      <label htmlFor="author" style={{ textAlign: "right" }}>Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={review.author}
        onChange={handleChange}
        required
        style={{ padding: "8px", width: "100%" }}
      />
      
      <label htmlFor="content" style={{ textAlign: "right" }}>Content:</label>
      <textarea
        id="content"
        name="content"
        value={review.content}
        onChange={handleChange}
        required
        style={{ padding: "8px", width: "100%", height: "80px" }}
      ></textarea>
      
      <label htmlFor="rating" style={{ textAlign: "right" }}>Rating:</label>
      <select
        id="rating"
        name="rating"
        value={review.rating}
        onChange={handleChange}
        required
        style={{ padding: "8px", width: "100%" }}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>{rating}</option>
        ))}
      </select>
      
      <div style={{ gridColumn: "1 / span 2", textAlign: "center" }}>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#6200EE", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Submit
        </button>
      </div>
      
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ReviewForm;
