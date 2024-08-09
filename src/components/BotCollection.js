import React from "react";
import BotCard from "./BotCard";
import "./BotCollection.css";

// Function component for the BotCollection
const BotCollection = ({ botsList, enlistBotHandler }) => {
  return (
    <>
      <div>
        <h2 className="bot-collection-container-title">Your Bot Army</h2>
      </div>

      <div className="bot-collection-container">
        {/* Map through botsList and render BotCard for each robot */}

        {botsList.map((bot) => (
          <BotCard key={bot.id} botData={bot} onBotClick={enlistBotHandler} />
        ))}
      </div>
    </>
  );
};

export default BotCollection;
