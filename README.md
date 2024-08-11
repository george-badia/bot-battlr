# Bot Battlr

## August 2024

Bot Battlr is a React application where users can view, enlist, and manage a collection of bots in an army. Each bot belongs to a specific class and has unique attributes like health, damage, and armor.

#### By **George Badia**

This project was created and is the sole property of George Badia.

## Description

Bot Battlr displays a list of available bots that can be enlisted into an army. Users can sort bots by different criteria, view detailed specifications for each bot, and manage their army by enlisting, releasing, or permanently discharging bots.

## Setup/Installation Requirements

- Linux or WSL for Windows users
- Visual Studio Code installed
- GitHub account
- Web browser

## Installation

1. Open your terminal and navigate to the desired directory.
2. Clone the repository from https://github.com/george-badia/bot-battlr
3. Clone the repository using the SSH key.
4. `cd bot-battlr`
5. Open the cloned repository in Visual Studio Code.
6. Install the dependencies: `npm install`

## Usage

1. Start the JSON Server: `json-server --watch db.json --port 8003`
2. Start the React application: `npm start`
3. Open http://localhost:3000 in your browser to view the app.

## Components

- **App**: The main component that manages the state and renders the sort bar, bot collection, your bot army, and bot specifications.
- **SortBar**: Allows users to sort bots by various criteria.
- **BotCollection**: Displays a list of bots that can be enlisted.
- **YourBotArmy**: Shows the bots that have been enlisted into the user's army.
- **BotSpecs**: Displays detailed information about a selected bot.

## Features

- Display a list of available bots with different classes and attributes.
- Enlist bots into an army with the ability to manage them.
- View detailed specifications of each bot.
- Sort bots by class, health, damage, or armor.
- Release or discharge bots from the army.

## Technologies Used

This program is built with:

- React
- CSS
- JSON Server
- Visual Studio Code environment

## Support and Contact Details

For any issues, please email me at george.otieno1@student.moringaschool.com

### License

This project is licensed under the MIT License.
