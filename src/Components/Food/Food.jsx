import React, { memo } from "react";
import { useSelector } from "react-redux";

import { selectFood } from "../../Store/game/gameSlice";

import "./Food.scss";

/**
 * Food Component
 *
 * This component represents the food item in the snake game.
 */
const Food = memo(function Food() {
  const food = useSelector(selectFood);

  return (
    <div
      className="food"
      style={{
        top: `${food.y * 20}px`,
        left: `${food.x * 20}px`,
      }}
    ></div>
  );
});

export default Food;
