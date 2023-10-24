import puppeteer from 'puppeteer'
import 'dotenv/config'
import { Entrypoints, Experience } from './constants/constants';
import { Google } from './types/google';
import { Glassdoor } from './types/glassdoor';
import { Indeed } from './types/indeed';
import { Linkedin } from './types/linkedin';
import { Site } from './types/sites';
import fs from 'fs'

if (!process.env.LOCATION) {
    console.log('LOCATION is required')
    process.exit();
}
if (!process.env.SEARCH_TERMS) {
    console.log('at least 1 SEARCH_TERM is required')
    process.exit();
}


const LOCATION = process.env.LOCATION    // REQUIRED
const SEARCH_TERMS = process.env.SEARCH_TERMS.split(",") // REQUIRED
const SEARCH_RADIUS = typeof (process.env.SEARCH_RADIUS) == 'string' ? Number.parseInt(process.env.SEARCH_RADIUS) : 60    //OPTIONAL
const JOB_LEVEL: Experience | undefined = process.env.JOB_LEVEL as Experience   //OPTIONAL
const DATE_POSTED = typeof (process.env.DATE_POSTED) == 'string' ? Number.parseInt(process.env.DATE_POSTED) : 30      //OPTIONAL         //i.e like 1, 3, 7, 14, 30, 60, 90 

console.log(`Scanning... Location : [${LOCATION}]`)
console.log(`Scanning... Search Terms : [${SEARCH_TERMS}}]`)
console.log(`Scanning... Search Radius : [${SEARCH_RADIUS}]`)
console.log(`Scanning... Job Level : [${JOB_LEVEL}]`)
console.log(`Scanning... Date Posted : [${DATE_POSTED}]`)


switch (process.argv[2]) {
    case 'glassdoor':
        work(new Glassdoor())
        break;
    case 'indeed':
        work(new Indeed())
        break;
    case 'google':
        work(new Google())
        break;
    case 'linkedin':
        work(new Linkedin())
        break;
    default:
        console.log('missing required argument : website to scrape')
        process.exit();
}

async function work<T extends Site>(worker: T): Promise<void> {
    let jobs: string[] = [];
    console.log(`Scanning ${process.argv[2]} for jobs ...`)
    for (let search_term of SEARCH_TERMS) {
        const browser = await puppeteer.launch({ headless: false, protocolTimeout: 1000000 })

        const page = await browser.newPage()
        await page.waitForTimeout(10000)
        if (process.argv[2] == 'linkedin') {
            await page.goto(`https://www.linkedin.com/jobs/search?keywords=${search_term}&location=${LOCATION}&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`, { timeout: 0 })
        } else {
            await page.goto(Entrypoints[process.argv[2]], { timeout: 0 })
        }

        await page.waitForTimeout(3000)

        await worker.setSearchTerm(page, search_term)
        await worker.setDatePosted(page, DATE_POSTED)
        await worker.setLocation(page, LOCATION)
        await worker.setLocationRadius(page, SEARCH_RADIUS)
        if (JOB_LEVEL)
            await worker.setExperienceLevel(page, JOB_LEVEL)

        jobs = [...jobs, ...await worker.scan(page)]

        await browser.close()
    }

    // TODO use read/write streams
    let old_work_path = `./src/_links_raw/${process.argv[2]}.json`
    let new_work_path = `./src/_todo/${process.argv[2]}.json`

    let new_work: string[] = []
    let old_work = JSON.parse(fs.readFileSync(old_work_path).toString())

    for (let element of jobs) {
        if (!old_work.includes(element)) {
            new_work.push(element)
            old_work.push(element)
        }
    }

    fs.writeFileSync(new_work_path, JSON.stringify(new_work))
    fs.writeFileSync(old_work_path, JSON.stringify(old_work))
    console.log('New jobs found : ' + new_work.length)
}
