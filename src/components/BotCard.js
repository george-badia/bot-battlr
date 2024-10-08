
import React from "react";
import "./BotCard.css";
//  component function for the BotCard
function BotCard({ botData, onBotClick, onDischargeClick }) {// Destructuring properties from botData
  const { name, avatar_url, health, damage, armor, bot_class} = botData;

  return (
    <div
      className={`bot-card ${bot_class}`}
      onClick={() => onBotClick(botData)}
    >
      <img src={avatar_url} alt={`${name}'s avatar`} className="bot-avatar" />
      <h3 className="bot-name">{name}</h3>
      <p>Class: {bot_class}</p>
      <p>Health: {health}</p>
      <p>Damage: {damage}</p>
      <p>Armor: {armor}</p>
      {/* &&operator to logically render discharge button if onDischargeClick is clicked/given */}
      {onDischargeClick && (
        <button
          className="discharge-button"
          onClick={(e) => {
            // Prevent event bubbling & Handle discharge click
            e.stopPropagation();
            onDischargeClick(botData);
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

export default BotCard;

//BotCard
//this component presents individual bot/robot details
//receives bot data and events through props
//an onClick event is incorporated for adding bot to army,reliving bot from army and discharging bot from army.
