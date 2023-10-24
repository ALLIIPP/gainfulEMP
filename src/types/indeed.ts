import { Page } from "puppeteer";
import { Experience, indeed_SearchRadiusMapping, indeed_DatePostedMapping, indeed_JobExpMapping } from "../constants/constants";
import { Site } from "./sites";

export class Indeed implements Site {

    async setSearchTerm(page: Page, term: string): Promise<void> {
        const locationInput = await page.$('#text-input-what');
        if (locationInput) {
            await locationInput.click()
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await locationInput.type(term);
            await locationInput.press('Enter');
        }
        await page.waitForTimeout(3000)
    }
    async setLocation(page: Page, location: string): Promise<void> {
        const locationInput = await page.$('#text-input-where');
        if (locationInput) {
            await locationInput.click()
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await locationInput.type(location);
            await locationInput.press('Enter');
        }
        await page.waitForTimeout(3000)
    }

    async setExperienceLevel(page: Page, experienceLevel: Experience): Promise<void> {
        let explvlDropDown = await page.$('#filter-explvl')
        if (explvlDropDown)
            await explvlDropDown.click()
        let levelFilterContainer = await page.$('#filter-explvl-menu')
        await page.waitForTimeout(3000)
        if (levelFilterContainer) {
            let listItems = await levelFilterContainer.$$('li')
            for (let i = 0; i < listItems.length; i++) {
                const aTexts = await listItems[i].$$eval('a', a => a.map(a => a.textContent));
                if (aTexts[0]?.toLowerCase().includes(experienceLevel.toLocaleLowerCase())) {
                    let button = await page.$(indeed_JobExpMapping[i])
                    if (button)
                        await button.click()
                    break;
                }

            }
        }
        await page.waitForTimeout(5000)
    }

    async setLocationRadius(page: Page, radius: number): Promise<void> {
        let searchRadius = ''
        for (let mapping of indeed_SearchRadiusMapping) {
            if (radius >= mapping[0]) {
                searchRadius = mapping[1]
                console.log(mapping[0])
                break;
            }
        }
        let radiusDropDown = await page.$('#filter-radius')
        if (radiusDropDown)
            await radiusDropDown.click()
        await page.waitForTimeout(3000)
        let radiusButton = await page.$(searchRadius)
        if (radiusButton)
            await radiusButton.click()

        await page.waitForTimeout(3000)
    }
    async setDatePosted(page: Page, datePosted: number): Promise<void> {
        let datePostedSelector = ''
        for (let date of indeed_DatePostedMapping) {
            if (datePosted >= date[0]) {
                datePostedSelector = date[1]
                break
            }

        }
        console.log(datePostedSelector)
        let dateButton = await page.$('#filter-dateposted')
        if (dateButton) {
            await dateButton.click()
        }
        await page.waitForTimeout(3000)
        let date = await page.$(datePostedSelector)
        if (date) {
            await date.click()
        }
        await page.waitForTimeout(3000)
    }

    async scan(page: Page): Promise<string[]> {
        let jobs: string[] = []
        while (true) {

            let ulElement = await page.$('#mosaic-provider-jobcards > ul')
            if (ulElement) {
                const listItems = await ulElement.$$('li')
                for (let item of listItems) {
                    const spanTexts = await item.$$eval('a', spans => spans.map(span => {
                        return span.getAttribute('data-jk')
                    }
                    ));
                    for (let entry of spanTexts) {
                        // console.log(spanTexts)
                        if (entry) {
                            jobs.push(`https://www.indeed.com/viewjob?jk=${entry}`)
                        }
                    }
                }
            }


            let pageTag = await page.evaluate(() => {
                const divElements = document.querySelectorAll('#jobsearch-JapanPage > div > div.css-hyhnne.e37uo190 > div.css-y3zau8.eu4oa1w0 > nav a'); // Replace with your selector
                return divElements[divElements.length - 1].ariaLabel ? divElements[divElements.length - 1].ariaLabel : 'whatever';

            });

            if (pageTag == 'Next Page') {
                let paginationNav = await page.$('#jobsearch-JapanPage > div > div.css-hyhnne.e37uo190 > div.css-y3zau8.eu4oa1w0 > nav')
                if (paginationNav) {
                    let pages = await paginationNav.$$('div > a')
                    await pages[pages.length - 1].click()
                }

            } else {
                break;
            }
            await page.waitForTimeout(5000)
        }
        return jobs

    }
}