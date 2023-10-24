import { Page } from "puppeteer";
import { Experience, linkedin_SearchRadiusMapping } from "../constants/constants";
import { Site } from "./sites";
import { linkedin_DatePostedMapping, linkedin_JobExpMappings } from "../constants/constants";

export class Linkedin implements Site {

    async setSearchTerm(page: Page, term: string): Promise<void> {
        /* setting search term forces login check*/
        return new Promise(resolve => resolve())
    }
    
    async setLocation(page: Page, location: string): Promise<void> {
        /* setting location term forces login check*/
        return new Promise(resolve => resolve())
    }

    async setExperienceLevel(page: Page, experienceLevel: Experience): Promise<void> {

        let levelFilterContainer = await page.$('#jserp-filters > ul > li:nth-child(7) > div > div > div > div > div')
        if (levelFilterContainer) {
            let alllevels = await levelFilterContainer.$$('div')
            for (let level of alllevels) {
                let labels = await level.$$('label')
                for (let label of labels) {
                    const labelText = await page.evaluate(label => label.textContent, label);
                    console.log('Label Text:', labelText);

                    for (let job of linkedin_JobExpMappings[experienceLevel]) {
                        if (labelText?.toLowerCase().includes(job.toLowerCase())) {
                            let innerinput = await level.$$('input')

                            for (let input of innerinput) {
                                await page.evaluate(input => input.click(), input)
                                break
                            }
                        }
                    }
                }

            }
        }

        await page.waitForTimeout(3000)
    }
    async setLocationRadius(page: Page, radius: number): Promise<void> {
        let radiusSelector = ''
        for (let mapping of linkedin_SearchRadiusMapping) {
            if (radius >= mapping[0]) {
                radiusSelector = mapping[1]
                break;
            }

        }
        let radiusBtn = await page.$('#jserp-filters > ul > li:nth-child(2) > div > div > button')
        if (radiusBtn)
            await radiusBtn.click()
        await page.waitForTimeout(3000)

        let selectedRadius = await page.$(radiusSelector)
        if (selectedRadius)
            await selectedRadius.click()

        await page.waitForTimeout(3000)
        let donebtn = await page.$('#jserp-filters > ul > li:nth-child(2) > div > div > div > button')

        if (donebtn) {
            await donebtn.click()
        }
        await page.waitForTimeout(5000)
    }
    async setDatePosted(page: Page, datePosted: number): Promise<void> {
        let datePostedSelector = ''
        for (let date of linkedin_DatePostedMapping) {
            if (datePosted >= date[0]) {
                datePostedSelector = date[1]
                break;
            }

        }
        let timeBtn = await page.$('#jserp-filters > ul > li:nth-child(1) > div > div > button')
        if (timeBtn)
            await timeBtn.click()
        await page.waitForTimeout(3000)

        let timePeriod = await page.$(datePostedSelector)
        if (timePeriod)
            await timePeriod.click()

        await page.waitForTimeout(3000)
        let donebtn = await page.$('#jserp-filters > ul > li:nth-child(1) > div > div > div > button')
        if (donebtn)
            await donebtn.click()
        await page.waitForTimeout(5000)
    }
    async scan(page: Page): Promise<string[]> {

        let jobs: string[] = []

        let ulElement = await page.$('#main-content > section.two-pane-serp-page__results-list > ul')
        if (ulElement) {

            const old_listItem = await ulElement.$$('li')
            let old_listItems = old_listItem.length
            while (true) {


                await page.evaluate(() => {
                    // Define the scrollHeight property of the document and the clientHeight of the viewport.
                    const scrollHeight = document.documentElement.scrollHeight;
                    const clientHeight = document.documentElement.clientHeight;

                    // Scroll down in small steps.
                    const scrollStep = clientHeight;

                    // Scroll down until we've reached the bottom of the page.
                    let scrollTop = 0;
                    while (scrollTop + clientHeight < scrollHeight) {
                        scrollTop += scrollStep;
                        window.scroll(0, scrollTop);
                        //requestAnimationFrame(null)
                        //   await new Promise((resolve) => requestAnimationFrame(resolve));
                    }
                });


                await page.waitForTimeout(10000)
                let new_listItem = await ulElement.$$('li')
                let new_listItems = new_listItem.length
                if (new_listItems == old_listItems) {
                    break;
                }
                old_listItems = new_listItems

            }


            const listItems = (await ulElement.$$('li'))
            for (let item of listItems) {
                //   await item.click()
                //  await page.waitForTimeout(5000)

                const spanTexts = await item.$$eval('a', spans => spans.map(span => span.href));
                console.log(spanTexts)
                try {
                    for (let element of spanTexts) {
                        if (element.includes('/jobs/view/')) {
                            jobs.push(spanTexts[0])
                            break;
                        }
                    }
                } catch (e) {
                    console.log('links empty')
                }
            }
        }
        return jobs
    }
}