import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentTheme, setTheme } from "../../Store/theme/themeSlice";

import "./ThemeSwitcher.scss";

/**
 * ThemeSwitcher Component
 *
 * This component provides a user interface for switching between different themes.
 *
 */
function ThemeSwitcher() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const ButtonHtml = (type, Text) => (
    <button
      onClick={() => handleThemeChange(type)}
      className={currentTheme === type ? "active" : ""}
    >
      {Text}
    </button>
  );

  return (
    <div className="theme-switcher">
      {ButtonHtml("retro", "Retro")}
      {ButtonHtml("candy", "Candy")}
      {ButtonHtml("ocean", "Ocean")}
      {ButtonHtml("desert", "Desert")}
    </div>
  );
}

export default ThemeSwitcher;
