const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

// Base URL
const baseUrl = "https://graffiti-database.com";

// Paths definition
const londonDir = path.join(__dirname, "london");
const milanDir = path.join(__dirname, "milan");
const nyDir = path.join(__dirname, "nyc");

// Create folders if they don't exist
if (!fs.existsSync(nyDir)) {
  fs.mkdirSync(nyDir);
}

if (!fs.existsSync(londonDir)) {
  fs.mkdirSync(londonDir);
}

if (!fs.existsSync(milanDir)) {
  fs.mkdirSync(milanDir);
}

// Milan
const milanLinks = [];
const milanCategories = [];
const milanUrl = "https://graffiti-database.com/Italy/Milan";
axios
  .get(milanUrl + "/categories")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $("p.image-info > a").each(function () {
      let i = $(this).attr("href");
      milanCategories.push(baseUrl + i);
    });
  })
  .then(() => {
    milanCategories.forEach((link) => {
      axios
        .get(link)
        .then((res) => {
          const $ = cheerio.load(res.data);
          $("p.image-info > a").each(function () {
            let url = $(this).attr("href");
            milanLinks.push(baseUrl + url);
          });
        })
        .then(() => {
          milanLinks.forEach((link) => {
            setInterval(() => {
              axios.get(link).then((res) => {
                fs.writeFileSync(
                  `${milanDir}/${link.split("/")[4]}.html`,
                  res.data,
                  (err) => {
                    if (err) throw err;
                    console.log("Done");
                  }
                );
              });
            }, 10000 + Math.random(1000));
          });
        })
        .catch((err) => {
          console.error(">> Error occured while retrieving graffitis", err);
        });
    });
  })
  .catch((err) => {
    console.error(
      ">> Error occurred while retrieving Milan neighborhoods:",
      err
    );
  });

// New York
const nyLinks = [];
const nyCategories = [];
const nyUrl = "https://graffiti-database.com/USA/New%20York%20City";
axios
  .get(nyUrl + "/categories")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $("p.image-info > a").each(function () {
      let i = $(this).attr("href");
      nyCategories.push(baseUrl + i);
    });
  })
  .then(() => {
    //console.log(nyCategories);
    nyCategories.forEach((link) => {
      axios
        .get(link)
        .then((res) => {
          const $ = cheerio.load(res.data);
          $("p.image-info > a").each(function () {
            let url = $(this).attr("href");
            nyLinks.push(baseUrl + url);
          });
        })
        .then(() => {
          nyLinks.forEach((link) => {
            setInterval(() => {
              axios.get(link).then((res) => {
                fs.writeFileSync(
                  `${nyDir}/${link.split("/")[4]}.html`,
                  res.data,
                  (err) => {
                    if (err) throw err;
                    console.log("Done");
                  }
                );
              });
            }, 10000 + Math.random(1000));
          });
          //console.log(nyLinks);
        })
        .catch((err) => {
          console.error(">> Error occured while retrieving graffitis", err);
        });
    });
  })
  .catch((err) => {
    console.error(">> Error occurred while retrieving NY neighborhoods:", err);
  });

// London
const londonLinks = [];
const londonCategories = [];
const londonUrl = "https://graffiti-database.com/United%20Kingdom/London";
axios
  .get(londonUrl + "/categories")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $("p.image-info > a").each(function () {
      let i = $(this).attr("href");
      londonCategories.push(baseUrl + i);
    });
  })
  .then(() => {
    londonCategories.forEach((link) => {
      axios
        .get(link)
        .then((res) => {
          const $ = cheerio.load(res.data);
          $("p.image-info > a").each(function () {
            let url = $(this).attr("href");
            londonLinks.push(baseUrl + url);
          });
        })
        .then(() => {
          londonLinks.forEach((link) => {
            setInterval(() => {
              axios.get(link).then((res) => {
                fs.writeFileSync(
                  `${londonDir}/${link.split("/")[4]}.html`,
                  res.data,
                  (err) => {
                    if (err) throw err;
                    console.log("Done");
                  }
                );
              });
            }, 10000 + Math.random(1000));
          });
        })
        .catch((err) => {
          console.error(">> Error occured while retrieving graffitis", err);
        });
    });
  })
  .catch((err) => {
    console.error(
      ">> Error occurred while retrieving London neighborhoods:",
      err
    );
  });
