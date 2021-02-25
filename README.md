# mc_server_user_stats
A single page application that queries a Minecraft server and tracks the time users spend online.

## Design Philosophy ##
This application is intended to be lightweight and not require direct access to server log files, help from server admins, etc. Given a server's IP address, it will query the server every 5 minutes. If any players are online, it will create database entry with their name. After that, any time that player is online in further queries, it will add 5 minutes to their total playtime total, as well as the subtotal for that day. This is based on the assumption that when a player is online, they are likely to be online for more than 5 minutes. As a result, the data that this application collects is an estimate. This is part of the compromise between collecting data and remaining lightweight/not requiring any special permissions.

## Installation ##
1. Ensure node.js ^10.22.0 is installed. Also ensure that PostgreSQL 13 is installed.
2. Run `npm install` to install application's dependencies.
3. Create and populate a `.env` file -- please see the `.env.example` file provided . Only a Minecraft server's IP and the user's PostgreSQL credentials are necessary for this application.
4. Ensure that PostgreSQL is running, and run `npm run db_setup` to initialize the tables this application will use.
5. Run `npm run build` to create the JS bundle.
6. Finally, run `npm start` to start the application. After this, it will automatically begin to query the Minecraft server every 5 minutes. The querying can be stopped and restarted with a GET request to `/api/stop` and `/api/start` respectively. After that, navigate to `http://localhost:3001` to view the frontend. Also note that the host and port can be changed in `server/index.js` if desired.

## Usage ##
- The application has 3 main tabs -- 'Total Playtime,' 'Individual Playtimes', and 'About.'
- 'Total Playtime' shows information about all players the application has collected, including a table of total playtime and a chart representing that same data. It also features a table that shows currently online players, and this can be refreshed with the 'Refresh Table' button. The chart can be refreshed using the 'Update Chart' button, but this will only update the table if there have been any changes to the data. This means a user must have been on the webpage for at least one query period, and a player must have been online for the playtime to change.
- 'Individual Playtimes' allows a user to select a player by name and view their playtime on individual days in both a table and chart form.
- 'About' displays information about the application and additional resources.

## Future Plans ##
- Mod list in 'About' tab
- Message board functionality for players to communicate asynchronously via an online instance of this application (?)

### Known Bugs/Issues ###
- Charts resize oddly. If a webpage is adjusted, the charts will always expand, whether the webpage is being expanded or shrunken. Current fix is to refresh webpage.
- Several settings in `react-chartjs-2` don't appear  to function as intended. In future, the library may need to be replaced with one that functions as intended, as it is the source of several bugs.

### Example ###
Please see: https://recordit.co/CtJdiY6H6e for an example of the frontend.
