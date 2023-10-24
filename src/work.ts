import puppeteer from 'puppeteer'
import fs from 'fs'

const MAX_LINKS_TO_FETCH = 10

fetchJobs()

async function fetchJobs() {
    let PATH_TO_FILE:string;
    switch (process.argv[2]) {
        case 'indeed':
            PATH_TO_FILE = './src/_todo/indeed.json'
            break;
        case 'google':
            PATH_TO_FILE = './src/_todo/google.json'
            break;
        case 'glassdoor':
            PATH_TO_FILE = './src/_todo/glassdoor.json'
            break;
        case 'linkedin':
            PATH_TO_FILE = './src/_todo/linkedin.json'
            break;
        default:
            console.log('missing argument')
            return
    }

    let all_links = JSON.parse(fs.readFileSync(PATH_TO_FILE).toString())
    console.log('all links length b : ' + all_links.length)

    let links = all_links.splice(0, MAX_LINKS_TO_FETCH)
    console.log('all links length : ' + all_links.length)
    const browser = await puppeteer.launch({ headless: false ,timeout:0})
    for (let element of links) {

        const page = await browser.newPage()
        await page.goto(element, { timeout: 0 })
        if(element.includes('linkedin'))
            await page.waitForTimeout(3000)
    }


    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(all_links))
}



