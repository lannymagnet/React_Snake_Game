import React from "react";

import { useSelector } from "react-redux";
import { selectCurrentTheme } from "./Store/theme/themeSlice";

import Game from "./Components/Game/Game";

import "./App.scss"; // Import global styles

/**
 * App Component
 *
 * The main App component that serves as the root of the React Snake Game application.
 * It wraps the application with the Redux Provider to provide global state management.
 */
function App() {
  const currentTheme = useSelector(selectCurrentTheme) || "dark";

  return (
    <div className={`app-container ${currentTheme}`}>
      <header className="app-header">
        <h1>React Snake Game</h1>
      </header>
      <main className="app-main">
        <Game />
      </main>
    </div>
  );
}

export default App;
