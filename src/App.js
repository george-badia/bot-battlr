import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import "./App.css";

const App = () => {
  // State to store all bots and enlisted bots
  const [allBots, setAllBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);

  // Fetch all bots from the server on component mount
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((response) => response.json())
      .then((data) => setAllBots(data))
      .catch((error) =>
        console.error("Error fetching can't find bots:", error)
      );
  }, []);
  //enlistBotHandler to addBot into the enlistedBots state
  const enlistBotHandler = (bot) => {
    if (!enlistedBots.some((enlistedBot) => enlistedBot.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };
  // releaseBotHandler to removeBot from the enlistedBots state in your bot army.
  const releaseBotHandler = (bot) => {
    setEnlistedBots(
      enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id)
    );
  };
  // Handler responsible to discharge a bot by making a DELETE request to the server...(n/b:rmbr to persist)
  const dischargeBotHandler = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAllBots(allBots.filter((allBot) => allBot.id !== bot.id));
        releaseBotHandler(bot);
      })
      .catch((error) => console.error("Error discharging bot:", error));
  };
  // Rendering YourBotArmy and BotCollection components by passing respective props
  return (
    <div className="app-container">
      <YourBotArmy
        enlistedBots={enlistedBots}
        releaseBotHandler={releaseBotHandler}
        dischargeBotHandler={dischargeBotHandler}
      />
      <BotCollection botsList={allBots} enlistBotHandler={enlistBotHandler} />
    </div>
  );
};

export default App;

//App
//render botCollection to show all bots
//render YourBotArmy to show enlisted bots
//use state to hold list of bot and the enlisted bots and useStateHook to fetch from "http://localhost:8001/bots" and store them in state
//ENLIST BOT adds a bot to the army if only not enlisted
//RELEASE BOT removes bot from the army
//DISCHARGE BOT permanently deletes a bot from the army and the server.(uses DELETE REQUEST)
