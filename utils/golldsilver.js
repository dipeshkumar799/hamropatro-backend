//scrap of goldsilvers
import axios from "axios";

import cheerio from "cheerio";
import dayjs from "dayjs";

const msTime = dayjs().valueOf();

const scrapeWebsite = async () => {
  try {
    const url = "https://www.hamropatro.com/gold";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const goldHallmarkTolaPrice = $("ul.gold-silver li:nth-child(2)")
      .text()
      .trim();
    const goldTejabiTolaPrice = $("ul.gold-silver li:nth-child(4)")
      .text()
      .trim();
    const silverTolaPrice = $("ul.gold-silver li:nth-child(6)").text().trim();
    const goldHallmarkGramPrice = $("ul.gold-silver li:nth-child(8)")
      .text()
      .trim();
    const goldTejabiGramPrice = $("ul.gold-silver li:nth-child(10)")
      .text()
      .trim();
    const silverGramPrice = $("ul.gold-silver li:nth-child(12)").text().trim();

    return {
      createdAt: msTime,
      goldHallmarkGramPrice,
      goldHallmarkTolaPrice,
      silverGramPrice,
      silverTolaPrice,
      goldTejabiGramPrice,
      goldTejabiTolaPrice,
    };
  } catch (error) {
    console.error(error);
  }
};

scrapeWebsite();
export default scrapeWebsite;
