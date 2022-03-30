/* eslint-env browser */
const puppeteer = require('puppeteer')

module.exports.render = async (msg, settings) => {
  const browser = await puppeteer.launch()
  const page = await (await browser).newPage()

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36')
  await page.setViewport({ width: 1920, height: 10800, deviceScaleFactor: 2 })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0')

  const data = Buffer.from(JSON.stringify({ messages: [{ data: msg }] })).toString('base64')
  await page.goto(`https://discohook.org/?data=${data}`)

  // set settings
  await page.evaluate((settings) => localStorage.setItem('settings', JSON.stringify(settings)), settings)
  await page.reload()

  // screenshot
  await page.waitForSelector('main > div > div')
  const png = await page.$('main > div > div')

  await png.evaluate((element) => (element.style['padding-top'] = '1.25rem'))
  await png.evaluate((element) => (element.style['padding-bottom'] = '1.25rem'))
  if (!msg.bot) await page.evaluate(() => document.querySelector('main > div > div > div > span').remove())

  await png.screenshot({ path: 'msg.png' })

  await page.close()
  await browser.close()
}
