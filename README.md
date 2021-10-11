# Graffiti Explorer

## Prerequisites

- Server and scraper: a machine with NodeJS support and PostgreSQL installed
- Database: a PostgreSQL 13 with PostGIS 13 (for GeoLocations)
- Client: it is a React application, so it needs NodeJS installed

## Preliminary steps

In order to correctly setup the application to host the server, you must know the IP address of your machine in your network.
**I saved this information, along with the API key for Mapbox in a separate file called keys.js, inside client/src folder. This is (for obvious reasons) not added to the git repo, so it must be configured.**

Create a file under client/src called _keys.js_ and add the following line to it:

```
export const server_address = "your_ip_address:8080";
export const mapbox_access_key = "your_mapbox_access_key";
```

Then, the server itself is configured to listen for the client coming from port 8081, so under the client folder add a .env file and add to it only the line `PORT=8081`.

### Database

Install PostGRESQL on the machine acting as a server, and add a DB to it; doesn't matter what it is called, as the server grabs all the connection information from the server/.env file.
After creating it, connect to it (I'm assuming from here on that PostGRES has a user configured with a password) and run the command: `CREATE EXTENSION postgis;`. This will enable the server to interact with geographic informations and to correctly return GeoJSON which the client is configured to understand.  
Next step is to configure the environment variables for the server. Create a file under the server folder called .env, and add the following lines to it:

```
PORT = 8080

DB_DATABASE=<name_of_the_database>
DB_USER=<name_of_the_user>
DB_PASSWORD=<your_users_password>
DB_HOST=<your_hostname (typically localhost)>
DB_DIALECT=postgres
```

### Spin up server

Now the server can be run. Go into the server folder and run `npm install` to read the package.json and install the dependencies; when this is done, the server can be started by running `npm run dev`. If it all went correctly, the last line in the terminal should be "Database synched correctly".

## Scraper

The scraper does not need any particular setup, it can be used out-of-the-box. However, a precise sequence must be followed:

- Go to [this link](graffiti-database.com/countries) and navigate to a city (for now it only works if the city has subcategories)
- Grab the URL **WITHOUT THE /categories part** (this is important)
- Open _scraper/urlDownloader.js_ file and add a variable (for example `const krakowUrl = 'https://graffiti-database.com/Poland/Krakow'`)
- Edit line 14 with the name of the variable and line 17 with the name of the folder (for example `"krakow"`)
- Use a terminal to run `cd scraper && node urlDownloader.js`. This will generate a folder with the specified name, containing an HTML page for each graffiti. Note that this step can take several minutes.
- Go to _scraper/index.js_ and add a variable for the directory (for example `const krakowDir = path.join(__dirname, "krakow")`. It is important that this last string is the same as the one in the line 17 of the previous step.
- Add the new variable to the `directories` array.
- Use node to run this file. If the server is running, everything present in the downloaded folder will be added to the database.

## Client

It is a standard React application; to install it, it is sufficient to cd into the client folder, run `npm install` and then spin up the local development server. If everything went correctly, The home page should open and the app should be interactable with.
