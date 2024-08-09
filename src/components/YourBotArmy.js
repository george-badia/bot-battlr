import React from "react";
import BotCard from "./BotCard";
import "./YourBotArmy.css";
//  component function for the YourBotArmy tha should be rendered
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
        {/* Maping through the enlistedBots and render BotCard for each robot,click event is utelized too */}
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
