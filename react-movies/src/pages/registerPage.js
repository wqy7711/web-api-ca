import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    Alert,
} from "@mui/material";

const RegisterPage = () => {
  const { register, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // Register the user
      await register(username, password);
      // After successful registration, automatically log them in
      await login(username, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Password must be at least 8 characters long and include at least one letter, one number, and one special character"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Login here
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;