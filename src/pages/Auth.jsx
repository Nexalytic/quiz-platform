import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  /* ✅ If already logged in → redirect */
  useEffect(() => {
    const stored = localStorage.getItem("playerName");
    if (stored) navigate("/");
  }, [navigate]);

  /* ✅ Validate Name */
  const validateName = () => {
    const trimmed = name.trim();

    if (trimmed.length < 5) {
      setError("Name must be minimum 5 characters");
      return false;
    }

    if (trimmed.length > 50) {
      setError("Name must be maximum 50 characters");
      return false;
    }

    setError("");
    return true;
  };

  /* ✅ Login Handler */
  const handleLogin = () => {
    if (!validateName()) return;

    localStorage.setItem("playerName", name.trim());
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",

        /* ⭐ PREMIUM MULTI GRADIENT BACKGROUND */
        background:
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 40%, #EC4899 100%)"
      }}
    >

      {/* ⭐ Floating Glow Blob 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          background: "#60A5FA",
          borderRadius: "50%",
          filter: "blur(130px)",
          top: "8%",
          left: "12%",
          opacity: 0.55
        }}
      />

      {/* ⭐ Floating Glow Blob 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          background: "#F472B6",
          borderRadius: "50%",
          filter: "blur(140px)",
          bottom: "8%",
          right: "10%",
          opacity: 0.45
        }}
      />

      <Paper
        sx={{
          p: 6,
          width: 420,
          borderRadius: 5,
          textAlign: "center",
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          zIndex: 2
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={800}>
            Welcome 👋
          </Typography>

          <Typography color="text.secondary">
            Enter your name to continue
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            Enter Platform
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Auth;
