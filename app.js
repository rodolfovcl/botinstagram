const puppeteer = require('puppeteer')

const tag = 'f1'
const likes = 5
let counter = 0

/*https://pptr.dev/*/
const inicio = async () => {
  try {
    // Abrir chrome
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true
    })
    // Nueva pagina
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/')
    // Inicio sesion
    await page.waitForSelector('input[name="username"]', {visible: true})
    await page.type('input[name="username"]', 'rodolfovcl', {delay:300})
    await page.type('input[type="password"]', '', {delay:300})
    await page.click('button[type="submit"]')


    // setTimeout(async() => { await page.screenshot({ path: 'captura.png' }) }, 1000)
    // setTimeout(async() => { await browser.close() }, 5000)

  } catch (error) {
    console.log('error: ', error)
  }
}
inicio()