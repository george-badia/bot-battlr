import React from "react";
import "./SortBar.css";

function SortBar({ onSort }) {
  function handleSortChange(event) {
   // Pass the selected sort option back to the parent component
    onSort(event.target.value);
  }

  return (
    <div className="sort-bar">
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="">Select...</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
}

export default SortBar;


//sortBar
/*
 SortBar Component
  provides a dropdown menu that allows users to sort bots
  by specific attributes such as health, damage, or armor.
 
  Props:
  onSort: is function passed from the parent component that handles the sorting logic.
 
handleSortChange
This function is triggered when the user selects an option from the dropdown menu.It calls the `onSort` function passed as a prop, sending the selected sorting criterion(e.g., "health", "damage", "armor") back to the parent component.

@param {Object} event - The event object containing the selected option value.
 
*/