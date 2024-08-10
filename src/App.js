import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from './components/BotSpecs';
import "./App.css";

function App() {
  // State to store all bots and enlisted bots
  const [allRoBots, setAllRoBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  // Fetch all bots from the server on component mount
  useEffect(function () {
    fetch("http://localhost:8003/bots")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setAllRoBots(data);
      })
      .catch(function (error) {
        console.log("Error fetching bots:", error);
      });
  }, []);

  // Function to add a bot into the enlistedBots state
  function enlistBot(bot) {
    if (!enlistedBots.some(function (enlistedBot) {
      return enlistedBot.bot_class === bot.bot_class;
    })) {
      setEnlistedBots([...enlistedBots, bot]);
      setAllRoBots(allRoBots.filter(function (b) {
        return b.id !== bot.id;
      }));
      setSelectedBot(null);
    }
  }



  // Function to remove a bot from the enlistedBots state in Your Bot Army
  function releaseBot(bot) {
    setEnlistedBots(
      enlistedBots.filter(function (enlistedBot) {
        return enlistedBot.id !== bot.id;
      })
    );
    setAllRoBots([...allRoBots, bot])
  }

  // Function to discharge a bot by making a DELETE request to the server
  function dischargeBot(bot) {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then(function () {
        setAllRoBots(allRoBots.filter(function (b) {
          return b.id !== bot.id;
        }));
        setEnlistedBots(enlistedBots.filter(function (enlistedBot) {
          return enlistedBot.id !== bot.id;
        }));
      })
      .catch(function (error) {
        console.error('Error discharging bot:', error);
      });
  }

  function showBotDetails(bot) {
    setSelectedBot(bot);
  }

  function goBackToList() {
    setSelectedBot(null);
  }
  // Rendering YourBotArmy and BotCollection components by passing respective props
  return (
    <div className="app-container">
       {selectedBot ? (
        <BotSpecs selectedBot={selectedBot} onGoBack={goBackToList} onEnlist={enlistBot} />
      ) : (
        <>
      <YourBotArmy
        enlistedBots={enlistedBots}
        releaseBotHandler={releaseBot}
        dischargeBotHandler={dischargeBot}
      />
      <BotCollection botsList={allRoBots} enlistBotHandler={enlistBot} />
      </>
      )}
    </div>
  );
}

export default App;

//App
//render botCollection to show all bots
//render YourBotArmy to show enlisted bots
//use state to hold list of bot and the enlisted bots and useStateHook to fetch from "http://localhost:8001/bots" and store them in state
//ENLIST BOT adds a bot to the army if only not enlisted
//RELEASE BOT removes bot from the army
//DISCHARGE BOT permanently deletes a bot from the army and the server.(uses DELETE REQUEST)
