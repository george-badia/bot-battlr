import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";
import "./App.css";

function App() {
  // State to store all bots and enlisted bots
  const [allBots, setAllBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");
 // Fetch all bots from the server on component mount
  useEffect(function () {
    fetch("http://localhost:8001/bots")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setAllBots(data);
      })
      .catch(function (error) {
        console.error("Error fetching bots:", error);
      });
  }, []);

// Function to add a bot into the enlistedBots state
  function enlistBot(bot) {
    // Check if a bot of the same class is already enlisted
    const classAlreadyEnlisted = enlistedBots.some(
      (enlistedBot) => enlistedBot.bot_class === bot.bot_class
    );
 //  if a bot of the same class is already enlisted then give the alert
    if (classAlreadyEnlisted) {
      alert("A bot of this class is already enlisted.");
      return;
    }

    setEnlistedBots([...enlistedBots, bot]);
    setAllBots(
      allBots.filter(function (b) {
        return b.id !== bot.id;
      })
    );
    setSelectedBot(null);
  }
// Function to remove a bot from the enlistedBots state in Your Bot Army
  function releaseBot(bot) {
    setEnlistedBots(
      enlistedBots.filter(function (enlistedBot) {
        return enlistedBot.id !== bot.id;
      })
    );
    setAllBots([...allBots, bot]);
  }
// Function to discharge a bot by making a DELETE request to the server
  function dischargeBot(bot) {
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then(function () {
        setAllBots(
          allBots.filter(function (b) {
            return b.id !== bot.id;
          })
        );
        setEnlistedBots(
          enlistedBots.filter(function (enlistedBot) {
            return enlistedBot.id !== bot.id;
          })
        );
      })
      .catch(function (error) {
        console.error("Error discharging bot:", error);
      });
  }

  function showBotDetails(bot) {
    setSelectedBot(bot);
  }

  function goBackToList() {
    setSelectedBot(null);
  }

  function sortBots(criteria) {
    setSortCriteria(criteria);
  }

  function getSortedBots() {
    if (!sortCriteria) return allBots;

    return [...allBots].sort((a, b) => b[sortCriteria] - a[sortCriteria]);
  }
// Rendering YourBotArmy and BotCollection components by passing respective props
  return (
    <div className="app-container">
      {selectedBot ? (
        <BotSpecs
          selectedBot={selectedBot}
          onGoBack={goBackToList}
          onEnlist={enlistBot}
          enlistedBots={enlistedBots}
        />
      ) : (
        <>
          <SortBar onSort={sortBots} />
          <YourBotArmy
            enlistedBots={enlistedBots}
            releaseBotHandler={releaseBot}
            dischargeBotHandler={dischargeBot}
          />
          <BotCollection
            botsList={getSortedBots()}
            enlistBotHandler={showBotDetails}
          />
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
