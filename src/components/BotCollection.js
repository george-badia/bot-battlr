import React from "react";
import BotCard from "./BotCard";
import "./BotCollection.css";
// Function component for the BotCollection
const BotCollection = ({ botsList, enlistBotHandler }) => {
  return (
    <>
      <div>
        <h2 className="bot-collection-container-title"> Bot Collection</h2>
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

//BotCollection
//this component displays all bots fetched from the server
//props will receive the list of robots and function to enlist and release the bots.
//finally incorporating onClick to enlist bot and release it from the army.
