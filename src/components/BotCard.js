import React from "react";
import "./BotCard.css";

const BotCard = ({ botData, onBotClick, onDischargeClick }) => {
  const { name, avatar_url, health, damage, armor } = botData;

  return (
    <div className="bot-card" onClick={() => onBotClick(botData)}>
      <img src={avatar_url} alt={`${name}'s avatar`} className="bot-avatar" />
      <h3 className="bot-name">{name}</h3>
      <p>Health: {health}</p>
      <p>Damage: {damage}</p>
      <p>Armor: {armor}</p>
      {onDischargeClick && (
        <button
          className="discharge-button"
          onClick={(e) => {
            e.stopPropagation();
            onDischargeClick(botData);
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default BotCard;
