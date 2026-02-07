import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  MenuItem,
  Container,
  Divider,
  Checkbox,
  FormControlLabel
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

/* ⭐ Redux Imports */
import { useDispatch } from "react-redux";
import { loadQuiz } from "../redux/quizActions";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ✅ VERSION PROTECTION */
  useEffect(() => {
    const version = "quiz_v2";
    const storedVersion = localStorage.getItem("quizVersion");

    if (storedVersion !== version) {
      localStorage.clear();
      localStorage.setItem("quizVersion", version);
    }
  }, []);

  const [open, setOpen] = useState(true);
  const [questionType, setQuestionType] = useState("");

  const createEmptyQuestion = (type = "") => ({
    type,
    title: "",
    question: "",
    options: ["", ""],
    correctAnswer: null,
    correctAnswers: [],
    textAnswer: "",
    status: "Active"
  });

  const [current, setCurrent] = useState(createEmptyQuestion());
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSelect = () => {
    if (!questionType) return;
    setCurrent(createEmptyQuestion(questionType));
    setOpen(false);
  };

  const getPageTitle = () => {
    switch (questionType) {
      case "mcq-single":
        return "Create MCQ (Single Correct)";
      case "mcq-multi":
        return "Create MCQ (Multi Correct)";
      case "short":
        return "Create Short Answer";
      case "description":
        return "Create Description Question";
      default:
        return "Create Quiz";
    }
  };

  /* ⭐ UPDATED VALIDATION (Evaluator Rules) */
  const validateForm = () => {

    // Title 10–30 chars
    if (
      current.title.trim().length < 10 ||
      current.title.trim().length > 30
    ) {
      setError("Title must be between 10 and 30 characters");
      return false;
    }

    // Question 10–200 chars
    if (
      current.question.trim().length < 10 ||
      current.question.trim().length > 200
    ) {
      setError("Question must be between 10 and 200 characters");
      return false;
    }

    if (
      current.type === "mcq-single" ||
      current.type === "mcq-multi"
    ) {
      const validOptions = current.options.filter(o => o.trim());
      if (validOptions.length < 2) {
        setError("Minimum 2 options required");
        return false;
      }
    }

    if (current.type === "mcq-single" && current.correctAnswer === null) {
      setError("Select correct answer");
      return false;
    }

    if (
      current.type === "mcq-multi" &&
      current.correctAnswers.length === 0
    ) {
      setError("Select at least one correct answer");
      return false;
    }

    if (
      (current.type === "short" || current.type === "description") &&
      current.textAnswer.trim() === ""
    ) {
      setError("Provide correct answer");
      return false;
    }

    setError("");
    return true;
  };

  const addQuestion = () => {
    if (!validateForm()) return;

    const cleaned = {
      ...current,
      options: current.options.filter(o => o.trim())
    };

    setQuestions(prev => [...prev, cleaned]);
    setCurrent(createEmptyQuestion(questionType));
  };

  const saveAll = () => {
    let updatedQuestions = [...questions];

    const hasCurrentData =
      current.title.trim() || current.question.trim();

    if (hasCurrentData) {
      if (!validateForm()) return;

      const cleaned = {
        ...current,
        options: current.options.filter(o => o.trim())
      };

      updatedQuestions.push(cleaned);
    }

    if (updatedQuestions.length === 0) {
      setError("Add at least one question");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("question")) || [];
    const finalData = [...existing, ...updatedQuestions];

    localStorage.setItem("question", JSON.stringify(finalData));

    dispatch(loadQuiz());
    setSuccessOpen(true);
  };

  const optionCard = (value, label) => (
    <Paper
      elevation={0}
      onClick={() => setQuestionType(value)}
      sx={{
        borderRadius: 3,
        py: 1.8,
        px: 2,
        border:
          questionType === value
            ? "2px solid #6366F1"
            : "1px solid #e5e7eb",
        background:
          questionType === value ? "#eef2ff" : "#fafafa",
        cursor: "pointer",
        fontWeight: 600,
        textAlign: "center"
      }}
    >
      {label}
    </Paper>
  );

  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            width: 440,
            p: 5,
            borderRadius: 5,
            mx: "auto",
            mt: "10%",
            position: "relative",
            textAlign: "center",
            background: "#fff"
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={() => navigate("/")}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" fontWeight={800} mb={3}>
            Select Question Type
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {optionCard("mcq-single", "MCQ (Single Correct)")}
            {optionCard("mcq-multi", "MCQ (Multi Correct)")}
            {optionCard("short", "Short Answer")}
            {optionCard("description", "Description")}
          </Box>

          <Button
            fullWidth
            sx={{ mt: 4 }}
            variant="contained"
            onClick={handleSelect}
            disabled={!questionType}
          >
            Continue
          </Button>
        </Box>
      </Modal>

      {!open && (
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <Paper sx={{ p: 5, borderRadius: 5 }}>
            <Typography variant="h4" fontWeight={800}>
              {getPageTitle()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <TextField
                label="Quiz Title"
                value={current.title}
                onChange={(e) =>
                  setCurrent({ ...current, title: e.target.value })
                }
              />

              <TextField
                label="Question"
                multiline
                rows={3}
                value={current.question}
                onChange={(e) =>
                  setCurrent({ ...current, question: e.target.value })
                }
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            {(questionType === "mcq-single" ||
              questionType === "mcq-multi") && (
              <>
                <Typography fontWeight={700}>
                  Answer Options
                </Typography>

                <Stack spacing={2} mt={2}>
                  {current.options.map((opt, i) => (
                    <Stack direction="row" key={i}>
                      <TextField
                        fullWidth
                        label={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...current.options];
                          updated[i] = e.target.value;
                          setCurrent({ ...current, options: updated });
                        }}
                      />

                      <IconButton
                        disabled={current.options.length <= 2}
                        onClick={() =>
                          setCurrent({
                            ...current,
                            options: current.options.filter(
                              (_, idx) => idx !== i
                            )
                          })
                        }
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Stack>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() =>
                      setCurrent({
                        ...current,
                        options: [...current.options, ""]
                      })
                    }
                  >
                    Add Option
                  </Button>
                </Stack>
              </>
            )}

            {questionType === "mcq-single" && (
              <TextField
                select
                label="Correct Answer"
                fullWidth
                sx={{ mt: 3 }}
                value={current.correctAnswer ?? ""}
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    correctAnswer: Number(e.target.value)
                  })
                }
              >
                {current.options.map((_, i) => (
                  <MenuItem key={i} value={i}>
                    Option {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {questionType === "mcq-multi" && (
              <Box mt={2}>
                <Typography fontWeight={700}>
                  Select Correct Answers
                </Typography>

                {current.options.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={current.correctAnswers.includes(i)}
                        onChange={(e) => {
                          let updated = [...current.correctAnswers];
                          if (e.target.checked) updated.push(i);
                          else updated = updated.filter(v => v !== i);

                          setCurrent({
                            ...current,
                            correctAnswers: updated
                          });
                        }}
                      />
                    }
                    label={opt || `Option ${i + 1}`}
                  />
                ))}
              </Box>
            )}

            {(questionType === "short" ||
              questionType === "description") && (
              <TextField
                label="Correct Answer"
                multiline={questionType === "description"}
                rows={questionType === "description" ? 4 : 1}
                fullWidth
                sx={{ mt: 3 }}
                value={current.textAnswer}
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    textAnswer: e.target.value
                  })
                }
              />
            )}

            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="contained" onClick={addQuestion}>
                Add Question
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={saveAll}
              >
                Save All Questions
              </Button>
            </Stack>
          </Paper>
        </Container>
      )}

      <Modal open={successOpen}>
        <Box
          sx={{
            p: 5,
            width: 400,
            mx: "auto",
            mt: "15%",
            background: "#fff",
            borderRadius: 3
          }}
        >
          <Typography variant="h6">
            Questions Saved Successfully
          </Typography>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => navigate("/my-quiz")}
          >
            View All Questions
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateQuiz;
