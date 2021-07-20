const puppeteer = require("puppeteer");

exports.urlScrape = (req, res) => {
  // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
  puppeteer.launch().then(async function (browser) {
    const page = await browser.newPage();
    await page.goto(
      "https://www.indeed.com/jobs?q=web%20developer&l=Stratford%2C%20CT&vjk=bd4d0ba3701e67bb&advn=5970620996616872"
    );

    // Targeting the DOM Nodes that contain the Digimon names
    const jobTitle = await page.evaluate(
      () => document.querySelector(".jobsearch-JobInfoHeader-title").innerText
    );
    const jobDescriptionHTML = await page.evaluate(
      () =>
        document.querySelector(
          "div#jobDescriptionText.jobsearch-jobDescriptionText"
        ).innerHTML
    );

    // Closing the Puppeteer controlled headless browser
    await browser.close();

    // Sending the Digimon names to Postman
    res.send({ jobTitle, jobDescriptionHTML });
  });
};
