import React from "react";
import { useSelector } from "react-redux";

import { selectScore } from "../../Store/game/gameSlice";

import "./ScoreCard.scss";

/**
 * ScoreCard Component
 *
 * This functional component displays the current score of the game.
 */
function ScoreCard() {
  const score = useSelector(selectScore);

  return <div className="score-card">Score: {score}</div>;
}

export default ScoreCard;
