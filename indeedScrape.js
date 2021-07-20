const puppeteer = require('puppeteer')

const scrapeTitle = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.indeed.com/jobs?q=web%20developer&l=Stratford%2C%20CT&ts=1600557668071&rq=1&rsIdx=0&vjk=651fce088bf3d548&advn=7566058383449221')

  const scrapedData = await page.evaluate(() =>
  document.querySelector('.jobsearch-JobInfoHeader-title').innerText)

  await browser.close()
  return scrapedData
}

const scrapeDescription = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.indeed.com/jobs?q=web%20developer&l=Stratford%2C%20CT&ts=1600557668071&rq=1&rsIdx=0&vjk=651fce088bf3d548&advn=7566058383449221'
  )

  const scrapedData = await page.evaluate(() =>
  document.querySelector('div#jobDescriptionText.jobsearch-jobDescriptionText').innerHTML)

  await browser.close()
  return scrapedData
}
