# ARIF BABU BOT - Project Overview

## Description
A highly customized Facebook Messenger bot based on the Mirai Bot framework. It automates group interactions, provides entertainment via commands (games, media downloading, AI chat), and manages community features like ranking and interaction tracking.

## Tech Stack
- **Language:** JavaScript (Node.js 20.x)
- **Package Manager:** npm
- **Database:** SQLite via Sequelize ORM
- **Web Dashboard:** Express.js (status page and health check)
- **Facebook API:** fca-priyansh / priyanshu-fca (Facebook Chat API variant)
- **AI:** OpenAI integration
- **Media:** ytdl-core, youtubei.js, canvas, jimp

## Project Structure
- `index.js` - Entry point: launches Express web dashboard on port 5000 and manages the bot process lifecycle
- `ARIF-BABU.js` - Main bot core: initializes globals, loads config, connects to DB, authenticates with Facebook
- `config.json` - Global configuration (prefix, admin IDs, database settings, feature toggles)
- `includes/` - Core internal logic (controllers, database models, event handlers)
- `models/commands/` - Individual command files (loaded dynamically)
- `models/events/` - Event-driven modules for Facebook group events
- `languages/` - Localization files (en.lang, etc.)
- `utils/` - Utility functions (logging)
- `COOKIES.txt` / `appstate.json` - Facebook authentication cookies

## Running the App
- **Start:** `npm start` (runs `node index.js`)
- **Dev:** `npm run dev` (uses nodemon for auto-restart)
- The Express web dashboard runs on `0.0.0.0:5000`
- The bot subprocess (ARIF-BABU.js) is spawned by index.js and auto-restarts on crash

## Authentication
The bot requires valid Facebook session cookies stored in `COOKIES.txt` or `appstate.json` to connect to Messenger.

## Deployment
- **Target:** VM (always-running, maintains persistent state)
- **Run command:** `node index.js`
- Port 5000 is the web dashboard (webview)
