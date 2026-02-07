import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Button,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ⭐ MUI Icons */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

/* ⭐ Updated Card Style */
const getCardStyle = (gradient) => ({
  height: 220, // ⭐ slightly taller professional ratio
  borderRadius: 4, // ⭐ less pill shape
  backdropFilter: "blur(8px)",
  background: gradient,
  color: "#fff",
  transition: "all 0.35s ease",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0px 18px 40px rgba(0,0,0,0.25)"
  }
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "auto",
        px: 2,
        py: 2,

        /* ⭐ Soft Premium Background */
        background:
          "linear-gradient(180deg, #f3f6fb 0%, #e9efff 100%)",
        minHeight: "90vh",
        borderRadius: 4
      }}
    >

      {/* ⭐ HERO SECTION */}
      <Box
        sx={{
          textAlign: "center",
          mt: { xs: 5, md: 8 },
          mb: { xs: 6, md: 8 }
        }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
            background: "linear-gradient(90deg, #5A67D8, #7C3AED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Smart Quiz Management Platform
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            margin: "auto",
            mb: 4
          }}
        >
          Create, manage and play quizzes seamlessly with a modern,
          responsive and easy-to-use interface.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/create-quiz")}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              boxShadow: "0px 6px 20px rgba(90,103,216,0.4)"
            }}
          >
            Create Quiz
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/play-quiz")}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5
            }}
          >
            Play Quiz
          </Button>
        </Stack>
      </Box>

      {/* ⭐ FEATURE CARDS */}
      <Grid container spacing={4} justifyContent="center">

        {/* Create Quiz */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={getCardStyle(
              "linear-gradient(135deg, #6366F1, #8B5CF6)"
            )}
            elevation={0}
          >
            <CardActionArea
              sx={{ height: "100%" }}
              onClick={() => navigate("/create-quiz")}
            >
              <CardContent sx={{ p: 4 }}>
                <AddCircleOutlineIcon sx={{ fontSize: 40, mb: 1 }} />

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Create New Quiz
                </Typography>

                <Typography sx={{ opacity: 0.9 }}>
                  Create and manage your own quiz questions.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* My Quiz */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={getCardStyle(
              "linear-gradient(135deg, #F59E0B, #F97316)"
            )}
            elevation={0}
          >
            <CardActionArea
              sx={{ height: "100%" }}
              onClick={() => navigate("/my-quiz")}
            >
              <CardContent sx={{ p: 4 }}>
                <QuizIcon sx={{ fontSize: 40, mb: 1 }} />

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  My Quizzes
                </Typography>

                <Typography sx={{ opacity: 0.9 }}>
                  View, edit and manage your created quizzes.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Play Quiz */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={getCardStyle(
              "linear-gradient(135deg, #10B981, #059669)"
            )}
            elevation={0}
          >
            <CardActionArea
              sx={{ height: "100%" }}
              onClick={() => navigate("/play-quiz")}
            >
              <CardContent sx={{ p: 4 }}>
                <SportsEsportsIcon sx={{ fontSize: 40, mb: 1 }} />

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Play Quiz
                </Typography>

                <Typography sx={{ opacity: 0.9 }}>
                  Start playing quizzes and test your knowledge.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Home;
