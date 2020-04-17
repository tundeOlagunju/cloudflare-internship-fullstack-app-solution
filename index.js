const Router = require('./router')
const URL_COOKIE_NAME = 'URL_COOKIE'
const RANDOM_COOKIE_NAME = 'RANDOM_COOKIE'
const API_URL = 'https://cfw-takehome.developers.workers.dev/api/variants'


function getCookie(request, name) {
    let result = null
    let cookieString = request.headers.get('Cookie')
    if (cookieString) {
      let cookies = cookieString.split(';')
      cookies.forEach(cookie => {
        let cookieName = cookie.split('=')[0].trim()
        if (cookieName === name) {
          let cookieVal = cookie.split('=')[1]
          result = cookieVal
        }
      })
    }
    console.log('result',result)
    return result
  }

function reWriter (random){
    const htmlRewriter = new HTMLRewriter()
    .on('h1#title', { element:  e => e.setInnerContent(`Version ${random+1}.0`) })
    .on('title', { element:  e => e.setInnerContent(`Version${random+1}.0`) })
    .on('p#description', { element:  e => e.setInnerContent(`How To Set Up Version ${random+1}.0`) })
    .on('a#url', { element: e => e.setInnerContent('Return to goal.com')})
    .on('a[href]', { element: e => {
        e.setAttribute('href',"https://www.goal.com/en-ng")
    }})
    return htmlRewriter
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    let res
    //Check Cookie for saved URL and random number
    const cookieUrl = getCookie(request, URL_COOKIE_NAME)
    const cookieRandom = getCookie(request, RANDOM_COOKIE_NAME)
    if(cookieUrl){
        res = await fetch(cookieUrl) 
        return reWriter(Number(cookieRandom)).transform(res)
    }
    const response = await fetch(API_URL)
    const urls = await response.json()
    const random = Math.floor(Math.random()*2)
    let url = urls.variants[random]
    request = new Request(url, request) 
    res = await fetch(request) 
    res = new Response(res.body, res)
    const urlCookieHeader = `${URL_COOKIE_NAME}=${url}; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Path='/';`
    const randomCookieHeader = `${RANDOM_COOKIE_NAME}=${random}; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Path='/';`
    res.headers.append("Set-Cookie", urlCookieHeader) 
    res.headers.append("Set-Cookie",randomCookieHeader)
    return reWriter(random).transform(res)

}