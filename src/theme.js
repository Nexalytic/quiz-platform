import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5" // Slightly more vibrant student-friendly blue
    },
    secondary: {
      main: "#f59e0b" // Warm playful accent
    },
    success: {
      main: "#10b981"
    },
    background: {
      default: "#f3f6fb"
    }
  },

  shape: {
    borderRadius: 14
  },

  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0px 12px 26px rgba(0,0,0,0.12)"
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 18px",
          transition: "0.3s"
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px"
        }
      }
    }
  }
});

export default theme;
