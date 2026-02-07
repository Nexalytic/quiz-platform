// src/redux/store.js

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";   // ⭐ FIXED IMPORT
import quizReducer from "./quizReducer";

const store = createStore(
  quizReducer,
  applyMiddleware(thunk)
);

export default store;
