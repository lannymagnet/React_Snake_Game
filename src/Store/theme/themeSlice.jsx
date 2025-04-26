import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: localStorage.getItem("snakeGameTheme") || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem("snakeGameTheme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

// Selector
export const selectCurrentTheme = (state) => state.theme.currentTheme;

export default themeSlice.reducer;
