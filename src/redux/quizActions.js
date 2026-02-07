// src/redux/quizActions.js

export const loadQuiz = () => {
  return (dispatch) => {
    dispatch({ type: "LOAD_QUIZ_START" });

    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("question")) || [];
      const activeQuestions = stored.filter(q => q.status === "Active");

      dispatch({
        type: "LOAD_QUIZ_SUCCESS",
        payload: activeQuestions
      });
    }, 500); // async-like delay
  };
};
