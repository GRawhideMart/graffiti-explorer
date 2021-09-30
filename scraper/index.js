const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");

const londonDir = path.join(__dirname, "london");
const milanDir = path.join(__dirname, "milan");
const nyDir = path.join(__dirname, "nyc");

const directories = [londonDir, milanDir, nyDir];

directories.forEach((directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.readFile(path.join(directory, file), (err, data) => {
        if (err) throw err;
        const html = data.toString();
        const $ = cheerio.load(html);
        const geolocation = $(".geo").text().replace("Geo location: ", "");
        const coordinates = geolocation.split(";");
        //const nextLink = $(".nextLink").attr("href");
        const title = $("#detail-image").attr("data-title");
        const city = $("#detail-image").attr("data-caption").split(",")[0];
        const author = $("#detail-image").attr("data-caption").split("By: ")[1];
        console.log({
          title,
          author,
          city,
          location: {
            type: "Point",
            coordinates: [coordinates[1], coordinates[0]],
          },
        });
      });
    });
  });
});
