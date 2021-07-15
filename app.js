const puppeteer = require('puppeteer')

const tag = 'f1'
const like = 5
let counter = 0

/*Dependencia para realizar scraping Pupperteer: https://pptr.dev/*/
const inicio = async () => {
  try {
    //? 1- Abrir chrome
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true
    })
    // Nueva pagina
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/')

    //? 2- Inicio sesion
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

    //? 3- Realizo buscqueda de hashtags
    await page.goto(`https://www.instagram.com/explore/tags/${tag}`)
    await page.waitForSelector('div[class="EZdmt"]', {visible: true}) // Contenedor general de los tags buscados
    await page.click('div[class="EZdmt"] > div > div > div > div > a') // Primera imagen del resultado

    //? 4- Inicio bucle para dar likes y cambiar a la siguiente imagen
    for (let i = 0; i < like; i++) {
      // Espero que este visible el boton de likes (corazon) y luego doy click
      await page.waitForSelector('div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button', {visible: true})
      await page.click('div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button')
      //Luego de dar like espero 1 seg para avanzar a la sgte imagen
      await page.waitForTimeout(1000)
      // Siguiente imagen
      await page.click('body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow')
      counter++
      await page.waitForTimeout(2000)
    }
    //Cierro carrusel de imagenes
    await page.click('body > div._2dDPU.CkGkG > div.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG > button')


    //? Opcional: Extraer datos desde la web usando sintaxis JS con pupperteer
    /*Referencia https://www.udemy.com/course/curso-de-web-scraping-en-nodejs/learn/lecture/23921754#questions*/
    /*Documentacion del metodo evaluate(): https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-pageevaluatepagefunction-args*/
    // await page.waitForSelector('input[name="username"]', {visible: true}) // Esperar a que este visible el metodo
    // const valor = await page.evaluate(() => {
    //   let texto = document.querySelector('p[class="izU2O "]').textContent
    //   return texto
    // })
    // console.log('valor', valor) // Resultado: valor ¿No tienes una cuenta? Regístrate

    //? Metodos opcionales
    // setTimeout(async() => { await page.screenshot({ path: 'captura.png' }) }, 1000)
    // setTimeout(async() => { await browser.close() }, 5000)
    // await process.exit()
  } catch (error) {
    console.log('Error al iniciar botinstagram: ', error)
  }
}
inicio()