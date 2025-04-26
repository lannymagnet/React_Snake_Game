import React from "react";
import { useSelector } from "react-redux";

import { selectSnake } from "../../Store/game/gameSlice";

import "./Snake.scss";

/**
 * Snake component renders the snake on the game board.
 *
 */
// const Snake = (function Snake() {
const Snake = () => {
  const snake = useSelector(selectSnake);

  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`snake-segment ${index}`}
          style={{
            top: `${segment.y * 20}px`,
            left: `${segment.x * 20}px`,
          }}
        >
          {index === 0 && (
            <div className="eyes-container">
              <div className="snake-eyes"></div>
              <div className="snake-eyes"></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
// });

export default Snake;
