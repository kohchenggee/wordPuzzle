import { createSlice } from "@reduxjs/toolkit";

export const NAVIGATE_PAGE = {
  main: "MAIN",
  game: "GAME",
  result: "RESULT",
  leaderBoard: "LEADER_BOARD",
};
const initialState = {
  page: NAVIGATE_PAGE.main,
  questionList: null,
  score: null,
};

export const pageCountSlice = createSlice({
  name: "pageCount",
  initialState,
  reducers: {
    navigatePage: (state, action) => {
      const { page, questionList, score } = action.payload;
      Object.assign(state, { page, questionList, score });
    },
    backToMainPage: (state, action) => {
      state.page = NAVIGATE_PAGE.main;
      questionList = null;
      score = null;
    },
  },
});

export const { navigatePage, backToMainPage } = pageCountSlice.actions;

export default pageCountSlice.reducer;
