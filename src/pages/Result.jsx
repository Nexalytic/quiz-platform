import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";

/* ================= TEXT HELPERS ================= */

const normalize = (text = "") =>
  text.toLowerCase().replace(/[^\w\s]/g, "").trim();

const textMatch = (correct = "", user = "") => {
  const correctWords = normalize(correct).split(" ");
  const userWords = normalize(user).split(" ");

  let match = 0;

  correctWords.forEach(word => {
    if (userWords.includes(word)) match++;
  });

  return match / correctWords.length >= 0.5;
};

const Result = () => {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("question")) || [];
    const answers = JSON.parse(localStorage.getItem("quizAnswers")) || [];

    const active = questions.filter(q => q.status === "Active");

    let correctCount = 0;

    active.forEach((q, index) => {
      const user = answers[index];
      if (!user) return;

      const type = q.type || "mcq-single";

      /* ===== MCQ SINGLE ===== */
      if (type === "mcq-single") {
        if (Number(user.answer) === Number(q.correctAnswer)) {
          correctCount++;
        }
      }

      /* ===== MCQ MULTI ===== */
      if (type === "mcq-multi") {
        const correct = [...(q.correctAnswers || [])]
          .map(Number)
          .sort()
          .join(",");

        const userAns = [...(user.answer || [])]
          .map(Number)
          .sort()
          .join(",");

        if (correct === userAns) {
          correctCount++;
        }
      }

      /* ===== SHORT / DESCRIPTION ===== */
      if (type === "short" || type === "description") {
        if (textMatch(q.textAnswer, user.answer)) {
          correctCount++;
        }
      }
    });

    setScore(correctCount);
    setTotal(active.length);
  }, []);

  const percentage = total ? (score / total) * 100 : 0;

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 75) return "🎉";
    if (percentage >= 50) return "👏";
    return "📘";
  };

  const getMessage = () => {
    if (percentage === 100) return "Outstanding Performance!";
    if (percentage >= 75) return "Great Job!";
    if (percentage >= 50) return "Good Effort!";
    return "Keep Practicing!";
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          width: 420,
          borderRadius: 6,
          textAlign: "center",
          backdropFilter: "blur(18px)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))",
          boxShadow: "0px 25px 60px rgba(0,0,0,0.15)"
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontSize: 50 }}>{getEmoji()}</Typography>

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: "linear-gradient(90deg,#5A67D8,#7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Quiz Result
          </Typography>

          <Typography fontWeight={600} color="text.secondary">
            {getMessage()}
          </Typography>

          <Typography variant="h6">
            Score: {score} / {total}
          </Typography>

          <Typography color="text.secondary">
            Correct Answers: {score}
          </Typography>

          <Typography color="text.secondary">
            Total Questions: {total}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Result;
