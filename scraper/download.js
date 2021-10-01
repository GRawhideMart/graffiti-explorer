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

const downloader = async (pages, rootDir) => {
  const directory = path.join(__dirname, rootDir);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  for (let index = 0; index < pages.length; index++) {
    setInterval(async () => {
      const response = await axios.get(pages[index]);
      fs.writeFileSync(
        `${directory}/${pages[index].split("/")[4]}.html`,
        response.data,
        (err) => {
          if (err) throw err;
          console.log("Done");
        }
      );
    }, 40000 + Math.floor(Math.random() * 40000));
  }
};

const buildPagesArray = async (cityUrl) => {
  const categories = await getCategories(cityUrl);
  const pagesPerCategory = await getPagesForCategories(categories);
  const links = await getLinks(pagesPerCategory);
  return links;
};

module.exports = { buildPagesArray, downloader };
