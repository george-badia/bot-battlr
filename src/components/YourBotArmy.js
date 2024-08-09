import React from "react";
import BotCard from "./BotCard";
import "./YourBotArmy.css";

const YourBotArmy = ({
  enlistedBots,
  releaseBotHandler,
  dischargeBotHandler,
}) => {
  return (
    <>
      <div>
        <h2 className="your-bot-army-title">Your Bot Army</h2>
      </div>
      <div className="your-bot-army-container">
        {enlistedBots.map((bot) => (
          <BotCard
            key={bot.id}
            botData={bot}
            onBotClick={releaseBotHandler}
            onDischargeClick={dischargeBotHandler}
          />
        ))}
      </div>
    </>
  );
};

export default YourBotArmy;
