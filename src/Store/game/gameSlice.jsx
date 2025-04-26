import { createSlice } from "@reduxjs/toolkit";

const BOARD_SIZE = 25;

const initialState = {
  snake: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
  ],
  food: { x: 10, y: 10 },
  direction: "RIGHT",
  gameOver: false,
  score: 0,
  boardSize: BOARD_SIZE,
  gameStart: false,
  gamePaused: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDirection: (state, action) => {
      state.direction = action.payload;
    },

    setStartGame: (state) => {
      state.gameStart = true;
    },

    setPauseGame: (state) => {
      if (state.gameStart == false) return;
      state.gamePaused = !state.gamePaused;
    },

    moveSnake: (state, action) => {
      //Game not started.
      if (
        state.gameStart == false ||
        state.gamePaused == true ||
        state.gameOver == true
      )
        return;

      const grow = action.payload;
      const head = { ...state.snake[0] };

      switch (state.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      state.snake = [head, ...state.snake];
      if (!grow) {
        state.snake.pop();
      }

      //Intial snake length is 2 before starting the game.
      state.score = state.snake.length - 2;
    },

    generateFood: (state) => {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * state.boardSize),
          y: Math.floor(Math.random() * state.boardSize),
        };
      } while (
        state.snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      );

      state.food = newFood;
    },

    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },

    resetGame: (state) => {
      state.snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
      ];
      state.food = { x: 10, y: 10 };
      state.direction = "RIGHT";
      state.gameStart = false;
      state.gameOver = false;
      state.score = 0;
    },
  },
});

export const {
  setDirection,
  moveSnake,
  generateFood,
  setGameOver,
  resetGame,
  setStartGame,
  setPauseGame,
} = gameSlice.actions;

// Selectors
export const selectSnake = (state) => state.game.snake;
export const selectFood = (state) => state.game.food;
export const selectDirection = (state) => state.game.direction;
export const selectGameOver = (state) => state.game.gameOver;
export const selectScore = (state) => state.game.score;
export const selectBoardSize = (state) => state.game.boardSize;
export const selectGameStart = (state) => state.game.gameStart;
export const selectGamePaused = (state) => state.game.gamePaused;

export default gameSlice.reducer;
