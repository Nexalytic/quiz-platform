import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Container,
  IconButton,
  Tooltip,
  Stack
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MyQuiz = () => {
  const [questions, setQuestions] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("question")) || [];

    const withStatus = stored.map((q) => ({
      ...q,
      status: q.status || "Active"
    }));

    setQuestions(withStatus);
    localStorage.setItem("question", JSON.stringify(withStatus));
  }, []);

  const handleStatusChange = (index, value) => {
    const updated = [...questions];
    updated[index].status = value;
    setQuestions(updated);
    localStorage.setItem("question", JSON.stringify(updated));
  };

  const handleEditClick = (quiz, index) => {
    setSelectedQuiz({ ...quiz });
    setEditIndex(index);
    setEditOpen(true);
  };

  const handleUpdateQuiz = () => {
    const updated = [...questions];
    updated[editIndex] = selectedQuiz;

    setQuestions(updated);
    localStorage.setItem("question", JSON.stringify(updated));
    setEditOpen(false);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    const updated = questions.filter((_, i) => i !== deleteIndex);
    setQuestions(updated);
    localStorage.setItem("question", JSON.stringify(updated));
    setDeleteOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))",
          boxShadow: "0px 25px 60px rgba(0,0,0,0.12)"
        }}
      >
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: "linear-gradient(90deg,#5A67D8,#7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            My Quizzes
          </Typography>
        </Stack>

        {questions.length === 0 ? (
          <Typography>No quizzes found.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                  <TableCell><b>Quiz No</b></TableCell>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Created Date</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {questions.map((q, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      transition: "0.3s",
                      "&:hover": { backgroundColor: "#f9fafb" }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell sx={{ fontWeight: 500 }}>
                      {q.title}
                    </TableCell>

                    <TableCell>
                      <RadioGroup
                        row
                        value={q.status}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Active"
                          control={<Radio />}
                          label="Active"
                        />
                        <FormControlLabel
                          value="Inactive"
                          control={<Radio />}
                          label="Inactive"
                        />
                      </RadioGroup>
                    </TableCell>

                    <TableCell>
                      {new Date().toLocaleDateString()}
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Edit Quiz">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(q, index)}
                            sx={{
                              background: "rgba(59,130,246,0.1)",
                              "&:hover": {
                                background: "rgba(59,130,246,0.25)"
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Quiz">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(index)}
                            sx={{
                              background: "rgba(239,68,68,0.1)",
                              "&:hover": {
                                background: "rgba(239,68,68,0.25)"
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Quiz</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Quiz Title"
            value={selectedQuiz?.title || ""}
            onChange={(e) =>
              setSelectedQuiz({ ...selectedQuiz, title: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Question"
            value={selectedQuiz?.question || ""}
            onChange={(e) =>
              setSelectedQuiz({ ...selectedQuiz, question: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateQuiz}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Quiz</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this quiz?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyQuiz;
