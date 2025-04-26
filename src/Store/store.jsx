/**
 * Redux store configuration for the Snake Game application.
 *
 * This store combines the `game` and `theme` reducers to manage the application's state.
 */
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    theme: themeReducer,
  },
});
