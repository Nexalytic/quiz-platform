const initialState = {
  questions: [],
  loading: false
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {

    case "LOAD_QUIZ_START":
      return {
        ...state,
        loading: true
      };

    case "LOAD_QUIZ_SUCCESS":
      return {
        ...state,
        questions: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default quizReducer;
