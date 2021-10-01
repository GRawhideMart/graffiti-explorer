const { buildPagesArray, downloader } = require("./download");

const nyUrl = "https://graffiti-database.com/USA/New%20York%20City";
const londonUrl = "https://graffiti-database.com/United%20Kingdom/London";
const milanUrl = "https://graffiti-database.com/Italy/Milan";

//const allPages = [];

buildPagesArray(nyUrl).then((result) => {
  //allPages.push(...result);
  console.log(result);
  downloader(result, "nyc")
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
});
