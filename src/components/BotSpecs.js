
import React from "react";
import "./BotSpecs.css";

const BotSpecs = ({ selectedBot, onGoBack, onEnlist }) => {
  const { name, avatar_url, health, damage, armor, bot_class } = selectedBot;

  return (
    <div className={`bot-specs-container ${bot_class}`}>
      <img src={avatar_url} alt={`${name}'s avatar`} className="bot-avatar" />
      <h3 className="bot-name">{name}</h3>
      <p>Class: {bot_class}</p>
      <p>Health: {health}</p>
      <p>Damage: {damage}</p>
      <p>Armor: {armor}</p>
      <div className="button-group">
        <button onClick={onGoBack} className="go-back-button">
          Go Back
        </button>
        <button onClick={() => onEnlist(selectedBot)} className="enlist-button">
          Enlist
        </button>
      </div>
    </div>
  );
};

export default BotSpecs;