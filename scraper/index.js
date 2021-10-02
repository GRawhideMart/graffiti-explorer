const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
require("dotenv").config();

const Graffiti = require("../server/models/graffiti.model");

// Delete everything from table, only in development
Graffiti.destroy({ where: {} });

// Build directory names and combining them
const londonDir = path.join(__dirname, "london");
const milanDir = path.join(__dirname, "milan");
const nyDir = path.join(__dirname, "nyc");
const bucharestDir = path.join(__dirname, "bucharest");
const kievDir = path.join(__dirname, "kiev");

const directories = [londonDir, milanDir, nyDir, bucharestDir, kievDir];

// loop through each directory and file to scrape the informations
directories.forEach((directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.readFile(path.join(directory, file), (err, data) => {
        if (err) throw err;
        const html = data.toString();
        const $ = cheerio.load(html); // This eventually will have to come from files within the folders
        const image = $("#detail-image").attr("data-image");
        const title = $("#detail-image").attr("data-title");
        const city = $("#detail-image").attr("data-caption").split(",")[0];
        const author = $("#detail-image").attr("data-caption").split("By: ")[1];
        const coordinates = $(".geo")
          .text()
          .replace("Geo location: ", "")
          .split(";");
        // const longitude = coordinates[0];
        // const latitude = coordinates[1];
        const location = {
          type: "Point",
          coordinates,
        };
        // console.log({
        //   image,
        //   title,
        //   author,
        //   city,
        //   location,
        // });
        Graffiti.create({
          // use Sequelize's model to insert information in the DB
          image,
          title,
          author,
          city,
          geolocation: location,
        });
      });
    });
  });
});
