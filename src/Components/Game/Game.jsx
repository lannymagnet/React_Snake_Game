import React from "react";

import Board from "../Board/Board";
import ScoreCard from "../ScoreCard/ScoreCard";

import "./Game.scss";
import { setTheme } from "../../Store/theme/themeSlice";
import { useDispatch } from "react-redux";

/**
 * Game Component
 *
 * Game component serves as the main container for the Snake Game.
 * It renders the ScoreCard component to display the player's score
 * and the Board component where the game is played.
 */
function Game() {
  const dispatch = useDispatch();

  const title = (text) => {
    return (
      <span>
        <b>
          <u>{text}</u>
        </b>
      </span>
    );
  };

  const textButton = (text, isButtonForControl, type) => {
    return (
      <span
        class="start-btn"
        onClick={() => {
          isButtonForControl ? () => {} : dispatch(setTheme(type));
        }}
      >
        {text}
      </span>
    );
  };

  return (
    <div className="game-container">
      <ScoreCard />
      <div className="game-board-section">
        <div className="controls">
          {title("Controls")}
          <span className="title">Move Snake</span>
          <div className="keypad-section">
            <span class="video-game-button">W</span>
            <span class="video-game-button">A</span>
            <span class="video-game-button">S</span>
            <span class="video-game-button">D</span>
          </div>
          <div className="keypad-section">
            <span class="video-game-button">↑</span>
            <span class="video-game-button">←</span>
            <span class="video-game-button">↓</span>
            <span class="video-game-button">→</span>
          </div>
          <span className="title">Start Game</span>
          <span class="start-btn">ENTER</span>
          <span className="title">Pause Game</span>
          <span class="start-btn">P</span>
          <span className="title">Restart Game</span>
          <span class="start-btn">R</span>
        </div>
        <Board />
        <div className="themes">
          {title("Change Themes")}
          {textButton("Retro", false, "retro")}
          {textButton("Ocean", false, "ocean")}
          {textButton("Vampiric", false, "vampiric")}
          {textButton("Midnight", false, "midnight")}
        </div>
      </div>
    </div>
  );
}

export default Game;
