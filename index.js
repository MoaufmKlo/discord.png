/* eslint-env browser */
const puppeteer = require('puppeteer')

const browser = puppeteer.launch({
  dumpio: true,
  headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting none']
})

module.exports.render = async (msg, settings) => {
  await browser

  const page = await (await browser).newPage()

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36')
  await page.setViewport({ width: 1920, height: 5400 })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0')

  await page.goto('https://discohook.org/')

  // set settings
  await page.evaluate((settings) => localStorage.setItem('settings', JSON.stringify(settings)), settings)
  await page.reload()

  // screenshot
  await page.waitForSelector('main > div > div')
  const png = await page.$('main > div > div')
  await png.screenshot({ path: 'msg.png' })

  await page.close()
}
