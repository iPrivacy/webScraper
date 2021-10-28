const PORT = 8000;
//Require packages
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");

// calling out express so we can use app.someModule when we have to use
// a module
const app = express();

const url = "https://fboxtv.com/";

// Fetches html data
axios(url)
  .then((response) => {
    // stores html data in variable html
    const html = response.data;
    //console.log(html)
    // Picking out elements with cheerio check documentation
    const $ = cheerio.load(html);
    const articles = [];
    $(".film-name", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
