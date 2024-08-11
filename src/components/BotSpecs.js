import React from "react";
import "./BotSpecs.css";
// BotSpecs component receives three props: selectedBot (the bot object), onGoBack (function to go back to the previous view), and onEnlist (function to enlist the bot)
const BotSpecs = ({ selectedBot, onGoBack, onEnlist }) => {
  // Destructuring the selectedBot object to extract necessary properties
  const {
    name,
    avatar_url,
    health,
    damage,
    armor,
    bot_class,
    updated_at,
    created_at,
    catchphrase,
  } = selectedBot;

  return (
    <div className={`bot-specs-container ${bot_class}`}>
      <img src={avatar_url} alt={`${name}'s avatar`} className="bot-avatar" />
      <h3 className="bot-name">{name}</h3>
      <p>Class: {bot_class}</p>
      <p>Health: {health}</p>
      <p>Damage: {damage}</p>
      <p>Armor: {armor}</p>
      <p>Created at: {created_at}</p>
      <p>Updated at: {updated_at}</p>
      <p>catchphrase:{catchphrase}</p>
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

//Bot Specs
/*
- Display Bot Details by Showing the selected bot's attributes like name, class, health, and catchphrase.
- Dynamic Style component by applying class-based styles to the container.
- Avatar Display: Renders the bot's avatar image.
- Provides buttons to go back or enlist the bot to enhance User Interaction:.
- Receives props for bot data and action handlers.
*/
