const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const baseUrl = "https://graffiti-database.com";

const createDirectoryIfNotExists = (name) => {
  const dirName = path.join(__dirname, name);
  if (fs.existsSync(dirName)) return;
  fs.mkdirSync(dirName);
};

// Scrapes the categories page for each city (typically it's neighborhoods)
const getCategories = async (cityUrl) => {
  const cityCategories = [];
  const response = await axios.get(cityUrl + "/categories");
  const $ = cheerio.load(response.data);
  $("p.image-info > a").each(function () {
    let i = $(this).attr("href");
    cityCategories.push(baseUrl + i);
  });
  return cityCategories;
};

// Builds URLs for each page of each category, providing categories are arrays
const getPagesForCategories = async (categories) => {
  const allPages = [];
  for (let index = 0; index < categories.length; index++) {
    const response = await axios.get(categories[index]);
    const $ = cheerio.load(response.data);
    const lastPage = $("li.page-item")
      .text()
      .split("\t\t\t\t\t\t\t")
      .slice(-3, -2)[0]
      .replace(/[\t\n]/g, "");
    for (page = 1; page <= lastPage; page++) {
      allPages.push(`${categories[index]}?page=${page}`);
    }
  }
  return allPages;
};

// For each of the pages (caught from past links) return an array with every piece's link
const getLinks = async (pages) => {
  const links = [];
  for (let index = 0; index < pages.length; index++) {
    const response = await axios.get(pages[index]);
    const $ = cheerio.load(response.data);
    $("p.image-info > a").each(function () {
      let url = $(this).attr("href");
      links.push(baseUrl + url);
    });
  }
  return links;
};

// Builds single array with every single page by combining the methods above
const buildPagesArray = async (cityUrl) => {
  const categories = await getCategories(cityUrl);
  const pagesPerCategory = await getPagesForCategories(categories);
  const links = await getLinks(pagesPerCategory);
  return links;
};

// Function to Download in a subfolder, the name of which must be provided as rootDir, starting from an array of pages
const downloader = async (pages, rootDir) => {
  const directory = path.join(__dirname, rootDir);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  for (let index = 0; index < pages.length; index++) {
    setTimeout(async () => {
      const response = await axios.get(pages[index]);
      const fileName = `${directory}/${pages[index].split("/")[4]}.html`;
      if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, response.data, (err) => {
          if (err) throw err;
          console.log("Done");
        });
      }
    }, index * 4000 + Math.floor(Math.random() * 4000));
  }
};

module.exports = { buildPagesArray, downloader };
