import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectSnake,
  selectFood,
  selectDirection,
  selectGameOver,
  moveSnake,
  setDirection,
  generateFood,
  resetGame,
  setGameOver,
  selectBoardSize,
  setStartGame,
  setPauseGame,
  selectGameStart,
  selectGamePaused,
} from "../../Store/game/gameSlice";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";

import "./Board.scss";

/**
 * Board Component
 *
 * The Board component represents the game board for the Snake game.
 * It handles the game logic, including snake movement, collision detection,
 * food generation, and game over conditions.
 */
function Board() {
  const dispatch = useDispatch();
  const snake = useSelector(selectSnake);
  const food = useSelector(selectFood);
  const direction = useSelector(selectDirection);
  const gameOver = useSelector(selectGameOver);
  const boardSize = useSelector(selectBoardSize);
  const gameStart = useSelector(selectGameStart);
  const gamePaused = useSelector(selectGamePaused);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "KeyP":
        case "p":
          dispatch(setPauseGame());
          break;
        case "Enter":
          dispatch(setStartGame());
          break;
        case "KeyR":
        case "r":
          dispatch(resetGame());
          break;
        case "ArrowUp":
        case "w":
        case "keyW":
          if (direction !== "DOWN") dispatch(setDirection("UP"));
          break;
        case "ArrowDown":
        case "s":
        case "keyS":
          if (direction !== "UP") dispatch(setDirection("DOWN"));
          break;
        case "ArrowLeft":
        case "a":
        case "keyA":
          if (direction !== "RIGHT") dispatch(setDirection("LEFT"));
          break;
        case "ArrowRight":
        case "d":
        case "keyD":
          if (direction !== "LEFT") dispatch(setDirection("RIGHT"));
          break;
        default:
          break;
      }
    },
    [direction, dispatch]
  );

  //Add a check whenever a button is pressed.
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const gameLoop = useCallback(() => {
    dispatch(moveSnake(false)); // False means don't grow the snake.
  }, [dispatch]);

  useEffect(() => {
    if (gameOver) return;

    const intervalId = setInterval(gameLoop, 150); // Adjust speed here

    return () => clearInterval(intervalId);
  }, [gameOver, gameLoop]);

  useEffect(() => {
    // Collision detection (self and walls)
    if (snake.length === 0) return;

    const head = snake[0];

    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize
    ) {
      dispatch(setGameOver(true));
      return;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        dispatch(setGameOver(true));
        return;
      }
    }

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      dispatch(generateFood());
      dispatch(moveSnake(true)); // True means grow the snake
    }
  }, [snake, food, dispatch, boardSize]);

  useEffect(() => {
    if (gameOver) {
      alert("Game Over! Score: " + snake.length);
      dispatch(resetGame());
    }
  }, [gameOver, dispatch, snake.length]);

  return (
    <div className="board-container">
      {!gameStart && <div className="game-status">Press ENTER to start.</div>}
      {gamePaused && (
        <div className="game-status">
          Game Paused. Press P to continue playing.
        </div>
      )}
      {!gamePaused && gameStart && (
        <div className="game-status"> Try to beat you own high score.</div>
      )}
      <div
        className="game-board"
        style={{
          width: `${boardSize * 20}px`,
          height: `${boardSize * 20}px`,
        }}
      >
        <Snake className={direction} />
        <Food />
      </div>
    </div>
  );
}

export default Board;
