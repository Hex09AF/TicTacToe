import React from "react";
import ReactDOM from "react-dom/client";
import { Game } from "./components";
import "./index.css";
import store from "./store/Caro";
import GameContext from "./context";
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GameContext.Provider value={store}>
    <Game />
  </GameContext.Provider>
);
