const path = require("path");
const fs = require("fs");
const axios = require("axios");

const nycPath = path.join(__dirname, "NYC");
const londonPath = path.join(__dirname, "London");
const milanPath = path.join(__dirname, "Milan");

//console.log(path.join(nycPath, "file" + 1 + ".html"));

const nyc = [
  "https://graffiti-database.com/image/31080",
  "https://graffiti-database.com/image/31081",
];
for (let i = 0; i < nyc.length; i++) {
  axios
    .get(nyc[i]) // nyc must be an array of links pertaining to NYC
    .then((res) => {
      fs.writeFile(`${path.join(nycPath, i + 1 + ".html")}`, res.data, () => {
        console.log(`Downloaded file${path.join(nycPath, i + 1 + ".html")}`);
        setTimeout(() => {
          console.log("Waiting for new fetch");
        }, 2500);
        console.log("Fetching new page");
      });
    });
}
