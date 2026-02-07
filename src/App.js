import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuiz from "./pages/MyQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import Result from "./pages/Result";
import Auth from "./pages/Auth";

import Navbar from "./components/Navbar";

/* MUI Theme */
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

/* ===== GLOBAL THEME ===== */
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f4f6f8" }
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  },

  shape: { borderRadius: 12 },

  components: {
    MuiCard: {
      styleOverrides: {
        root: { transition: "all 0.3s ease" }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600
        }
      }
    }
  }
});

/* ⭐ PRIVATE ROUTE GUARD */
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("playerName");
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Navbar />

        {/* ⭐ FULL PAGE BACKGROUND FIX */}
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
            pt: 4,
            pb: 4
          }}
        >
          <Container maxWidth="lg">
            <Routes>

              {/* ⭐ PUBLIC ROUTE */}
              <Route path="/auth" element={<Auth />} />

              {/* ⭐ PROTECTED ROUTES */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="/create-quiz"
                element={
                  <PrivateRoute>
                    <CreateQuiz />
                  </PrivateRoute>
                }
              />

              <Route
                path="/my-quiz"
                element={
                  <PrivateRoute>
                    <MyQuiz />
                  </PrivateRoute>
                }
              />

              <Route
                path="/play-quiz"
                element={
                  <PrivateRoute>
                    <PlayQuiz />
                  </PrivateRoute>
                }
              />

              <Route
                path="/result"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              />

            </Routes>
          </Container>
        </Box>

      </Router>
    </ThemeProvider>
  );
}

export default App;
