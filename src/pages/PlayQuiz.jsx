import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Checkbox
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ⭐ Redux Imports */
import { useDispatch, useSelector } from "react-redux";
import { loadQuiz } from "../redux/quizActions";

const PlayQuiz = () => {
  const navigate = useNavigate();

  /* ⭐ Redux Setup */
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  /* ================= LOAD QUESTIONS FROM REDUX ================= */
  useEffect(() => {
    dispatch(loadQuiz());
  }, [dispatch]);

  const currentQuestion = questions[currentIndex];

  /* ================= START QUIZ ================= */
  const handleStart = () => {

    const trimmedName = name.trim();

    // ✅ NEW VALIDATION (5 - 50 Characters)
    if (trimmedName.length < 5 || trimmedName.length > 50) {
      alert("Full Name must be between 5 and 50 characters");
      return;
    }

    if (questions.length === 0) return alert("No active quizzes");

    localStorage.setItem("playerName", trimmedName);
    setStarted(true);
  };

  /* ================= VALIDATE ANSWER ================= */
  const isAnswerProvided = () => {
    if (!currentQuestion) return false;

    if (currentQuestion.type === "mcq-single")
      return selectedSingle !== null;

    if (currentQuestion.type === "mcq-multi")
      return selectedMulti.length > 0;

    if (
      currentQuestion.type === "short" ||
      currentQuestion.type === "description"
    )
      return textAnswer.trim() !== "";

    return false;
  };

  /* ================= NEXT BUTTON ================= */
  const handleNext = () => {
    let answerPayload = null;

    if (currentQuestion.type === "mcq-single") {
      answerPayload = selectedSingle;
    }

    if (currentQuestion.type === "mcq-multi") {
      answerPayload = selectedMulti;
    }

    if (
      currentQuestion.type === "short" ||
      currentQuestion.type === "description"
    ) {
      answerPayload = textAnswer.trim();
    }

    const updated = [
      ...answers,
      { type: currentQuestion.type, answer: answerPayload }
    ];

    setAnswers(updated);

    /* Reset Inputs */
    setSelectedSingle(null);
    setSelectedMulti([]);
    setTextAnswer("");

    if (currentIndex === questions.length - 1) {
      localStorage.setItem("quizAnswers", JSON.stringify(updated));
      navigate("/result");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* ================= MULTI SELECT HANDLER ================= */
  const handleMultiToggle = (index) => {
    setSelectedMulti((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
      {!started ? (
        <Paper sx={{ p: 5, width: 420, borderRadius: 5 }}>
          <Typography variant="h5" fontWeight={800} mb={3}>
            Enter Your Name
          </Typography>

          <TextField
            fullWidth
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={handleStart}>
            Start Quiz
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 6, width: 650, borderRadius: 6 }}>
          <Typography textAlign="center" mb={2}>
            {currentQuestion?.title}
          </Typography>

          <Typography textAlign="center" mb={3}>
            Question {currentIndex + 1} / {questions.length}
          </Typography>

          <Typography variant="h5" textAlign="center" mb={4}>
            {currentQuestion?.question}
          </Typography>

          {/* MCQ SINGLE */}
          {currentQuestion?.type === "mcq-single" &&
            currentQuestion?.options && (
              <RadioGroup
                value={selectedSingle ?? ""}
                onChange={(e) => setSelectedSingle(Number(e.target.value))}
              >
                <Stack spacing={2}>
                  {currentQuestion.options.map((opt, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={idx}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            )}

          {/* MCQ MULTI */}
          {currentQuestion?.type === "mcq-multi" &&
            currentQuestion?.options && (
              <Stack spacing={1}>
                {currentQuestion.options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={selectedMulti.includes(idx)}
                        onChange={() => handleMultiToggle(idx)}
                      />
                    }
                    label={opt}
                  />
                ))}
              </Stack>
            )}

          {/* SHORT / DESCRIPTION */}
          {(currentQuestion?.type === "short" ||
            currentQuestion?.type === "description") && (
            <TextField
              fullWidth
              multiline={currentQuestion.type === "description"}
              rows={currentQuestion.type === "description" ? 4 : 1}
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              label="Your Answer"
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              disabled={!isAnswerProvided()}
              onClick={handleNext}
            >
              {currentIndex === questions.length - 1
                ? "Submit Quiz"
                : "Next Question"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default PlayQuiz;
