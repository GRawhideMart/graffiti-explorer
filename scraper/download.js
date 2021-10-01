const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const baseUrl = "https://graffiti-database.com";

const createDirectory = (name) => {
  const dirName = path.join(__dirname, name);
  if (fs.existsSync(dirName)) return;
  fs.mkdirSync(dirName);
};

const getCategories = async (cityUrl) => {
  const cityCategories = [];
  await axios
    .get(cityUrl + "/categories")
    .then((res) => {
      const $ = cheerio.load(res.data);
      $("p.image-info > a").each(function () {
        let i = $(this).attr("href");
        cityCategories.push(baseUrl + i);
      });
    })
    .catch((err) => console.error(">> Error retrieving categories: ", err));
  return cityCategories;
};

const getPagesForCategories = async (categories) => {
  const allPages = [];
  await categories.forEach((category) => {
    axios.get(category).then((res) => {
      const $ = cheerio.load(res.data);
      const lastPage = $("li.page-item")
        .text()
        .split("\t\t\t\t\t\t\t")
        .slice(-3, -2)[0]
        .replace(/[\t\n]/g, "");
      //   allPages.push(`${category}?page=${lastPage}`);
      //   console.log(allPages);
      for (page = 1; page <= lastPage; page++) {
        allPages.push(`${category}?page=${page}`);
      }
      //console.log(allPages);
    });
  });
  return allPages;
};

const getLinks = (pages) => {
  const links = [];
  pages.forEach((page) => {
    axios.get(page).then((res) => {
      const $ = cheerio.load(res.data);
      $("p.image-info > a").each(function () {
        let url = $(this).attr("href");
        links.push(baseUrl + url);
      });
    });
  });
  return links;
};

getCategories("https://graffiti-database.com/Italy/Milan")
  .then((categories) => getPagesForCategories(categories))
  .then((pages) => getLinks(pages))
  .then((link) => console.log(link));
