const { buildPagesArray, downloader } = require("./download");

const nyUrl = "https://graffiti-database.com/USA/New%20York%20City";
const londonUrl = "https://graffiti-database.com/United%20Kingdom/London";
const milanUrl = "https://graffiti-database.com/Italy/Milan";
const bucharestUrl = "https://graffiti-database.com/Romania/Bucharest";
const kievUrl = "https://graffiti-database.com/Ukraine/Kiev";

//const allPages = [];

buildPagesArray(londonUrl).then((result) => {
  //allPages.push(...result);
  console.log("Found", result.length, "items");
  downloader(result, "london")
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
});
