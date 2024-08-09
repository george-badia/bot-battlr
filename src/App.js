import React, { useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";

import "./App.css";

const App = () => {
  const [allBots, setAllBots] = useState([]);
  return (
    <div className="app-container">
      <YourBotArmy />
      <BotCollection botsList={allBots} />
    </div>
  );
};

export default App;
