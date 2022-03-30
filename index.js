/* eslint-env browser */
const puppeteer = require('puppeteer')

/**
 * @typedef {Object} settings
 * @property {'dark'|'light'} color
 * @property {'cozy'|'compact'} display
 * @property {Number} fontSize
 */

/**
 * render a Discord message
 * @param {*} msg discord message object
 * @param {settings} settings render settings
 */
module.exports.render = async (msg, settings) => {
  const browser = await puppeteer.launch({ args: ['--font-render-hinting=none'] })
  const page = await (await browser).newPage()

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36')
  await page.setViewport({ width: 1920, height: 10800, deviceScaleFactor: 2 })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0')

  const data = Buffer.from(JSON.stringify({ messages: [{ data: msg }] })).toString('base64')
  await page.goto(`https://discohook.org/?data=${data}`)

  // set settings
  await page.evaluate((settings) => localStorage.setItem('settings', JSON.stringify(settings)), settings)
  await page.reload()

  // add font
  for (let weight = 300; weight <= 700; weight = weight + 100) await page.addStyleTag({ content: `@font-face { font-family: Whitney; src:local('Whitney'), url('/static/whitney-${weight}.woff2'), url('/static/whitney-${weight}.woff'); font-style: normal; font-weight: ${weight} }` })
  await page.addStyleTag({ content: 'main, body { font-family: Whitney !important; }' })

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
