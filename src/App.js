import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";
import "./App.css";

function App() {
  // State to store all bots and enlisted bots
  const [allRoBots, setAllRoBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");
  // Fetch all bots from the server on component mount
  useEffect(function () {
    fetch("https://json-botbattlr.onrender.com/bots")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setAllRoBots(data);
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
    //  if a bot of the same class is already enlisted then it gives the alert"A bot of this class is already enlisted."
    if (classAlreadyEnlisted) {
      alert("A bot of this class is already enlisted.");
      return;
    }

    setEnlistedBots([...enlistedBots, bot]);
    setAllRoBots(
      allRoBots.filter(function (b) {
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
    setAllRoBots([...allRoBots, bot]);
  }
  // Function to discharge a bot by making a DELETE request to the server
  function dischargeBot(bot) {
    fetch(`https://json-botbattlr.onrender.com/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then(function () {
        setAllRoBots(
          allRoBots.filter(function (b) {
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
  // Sets the selected bot to display its details in the BotSpecs component
  function showBotDetails(bot) {
    setSelectedBot(bot);
  }
  // Clears the selected bot, effectively going back to the bot list view
  function goBackToList() {
    setSelectedBot(null);
  }
  // Updates the sort criteria for sorting bots by health, damage, or armor
  function sortBots(criteria) {
    setSortCriteria(criteria);
  }
  // Returns the bots list sorted based on the selected criteria (health, damage, armor)
  function getSortedBots() {
    if (!sortCriteria) return allRoBots;
    // Sorts the bots in descending order based on the selected criteria
    return [...allRoBots].sort((a, b) => b[sortCriteria] - a[sortCriteria]);
  }
  // Rendering YourBotArmy and BotCollection components by passing respective props and logic operation(conditional render)
  return (
    <div className="app-container">
      {/* If a bot is selected, display the BotSpecs component */}
      {selectedBot ? (
        <BotSpecs
          selectedBot={selectedBot}
          onGoBack={goBackToList}
          onEnlist={enlistBot}
          enlistedBots={enlistedBots}
        />
      ) : (
        // If no bot is selected, display the main view with SortBar, YourBotArmy, and BotCollection.
        <>
          <p className="welcome">
            Welcome to **Bot Battlr**, the one and only spot in the known
            universe where you can custom build your own Bot Army!
          </p>
          <SortBar onSort={sortBots} />
          {/* Display the YourBotArmy component, passing enlisted bots and handlers for releasing and discharging bots */}
          <YourBotArmy
            enlistedBots={enlistedBots}
            releaseBotHandler={releaseBot}
            dischargeBotHandler={dischargeBot}
          />
          {/* Display the BotCollection component, passing the sorted list of bots and the handler to show bot details */}
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
/*
- render botCollection to show all bots
- render YourBotArmy to show enlisted bots
- use state to hold list of bot and the enlisted bots and useStateHook to fetch from "http://localhost:8001/bots" and store them in state
- ENLIST BOT adds a bot to the army if only not enlisted
RELEASE BOT removes bot from the army
- DISCHARGE BOT permanently deletes a bot from the army and the server.(uses DELETE REQUEST)
- ADD STATE to track the currently selected bot.
- Conditionally render BotSpecs or BotCollection based on whether a bot is selected.
- ADDING  a function to handle going back to the list view.
//SORTING
- Add state to store the current sorting criteria.
- Implement sorting logic in the useEffect hook or in the rendering of BotCollection.
- Pass sorting criteria as props to BotCollection.
*/
