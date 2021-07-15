const puppeteer = require('puppeteer')

const tag = 'f1'
const likes = 5
let counter = 0

/*https://pptr.dev/*/
const inicio = async () => {
  try {
    //? Abrir chrome
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true
    })
    // Nueva pagina
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/')
    //? Inicio sesion
    // Espero a que el input este disponible 'waitForSelector'
    await page.waitForSelector('input[name="username"]', {visible: true})
    // Estando visible empiezo a interactuar con los inputs
    await page.type('input[name="username"]', 'rodolfovcl', {delay:300})
    await page.type('input[type="password"]', '', {delay:300})
    await page.click('button[type="submit"]')
    // Quitando alerta guardar inicio de sesion (esperando 1ro que este disponible el selector)
    await page.waitForSelector('div[class="cmbtv"] > button', {visible: true})
    await page.click('div[class="cmbtv"] > button')
    // Quitando alerta activar notificaciones
    await page.waitForSelector('div[class="mt3GC"] > button:nth-child(2)', {visible: true})
    await page.click('div[class="mt3GC"] > button:nth-child(2)')


    // setTimeout(async() => { await page.screenshot({ path: 'captura.png' }) }, 1000)
    // setTimeout(async() => { await browser.close() }, 5000)
  } catch (error) {
    console.log('error: ', error)
  }
}
inicio()