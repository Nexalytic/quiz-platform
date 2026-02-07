import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName");

  /* ⭐ Logout Handler */
  const handleLogout = () => {
    localStorage.removeItem("playerName");
    navigate("/auth");
    window.location.reload(); // ensures navbar refresh safely
  };

  return (
    <AppBar
      position="sticky"
      elevation={6}
      sx={{
        background:
          "linear-gradient(90deg, #5A67D8 0%, #4F46E5 50%, #6366F1 100%)",
        backdropFilter: "blur(6px)"
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "auto",
          minHeight: "70px"
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            letterSpacing: 1.2,
            transition: "0.3s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)"
            }
          }}
        >
          Quiz Platform
        </Typography>

        {/* NAV BUTTONS */}
        <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: 600,
              borderRadius: 3,
              px: 2,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/my-quiz"
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: 600,
              borderRadius: 3,
              px: 2,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)"
              }
            }}
          >
            My Quiz
          </Button>

          <Button
            component={Link}
            to="/play-quiz"
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: 600,
              borderRadius: 3,
              px: 2,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Play Quiz
          </Button>
        </Box>

        {/* PLAYER NAME + LOGOUT */}
        {playerName && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                ml: 3,
                fontWeight: 600,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))",
                px: 2.5,
                py: 0.7,
                borderRadius: 3,
                backdropFilter: "blur(4px)",
                transition: "0.3s"
              }}
            >
              Welcome, {playerName}
            </Typography>

            {/* ⭐ Logout Button */}
            <Button
              onClick={handleLogout}
              sx={{
                ml: 2,
                color: "#fff",
                fontWeight: 600,
                borderRadius: 3,
                px: 2,
                background: "rgba(255,255,255,0.15)",
                transition: "0.3s",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)"
                }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
