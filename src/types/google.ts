import { Page } from "puppeteer";
import { Experience, google_JobExpMapping, google_SearchRadiusMapping, google_DatePostedMapping } from "../constants/constants";
import { Site } from "./sites";



export class Google implements Site {

 

    async setSearchTerm(page:Page, term: string): Promise<void> {
        const locationInput = await page.$('#hs-qsb');
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
    async setLocation(page:Page,location: string): Promise<void> {
        /*
        there is no way to set location on google. its gotten automatically from ip
        */
       return new Promise(resolve=>resolve())
    }
    async setExperienceLevel(page:Page,experienceLevel: Experience): Promise<void> {
        let job_level_selectors:string[] = []
        switch (experienceLevel) {
            case Experience.Internship:
            case Experience.Entry:
                job_level_selectors.push(google_JobExpMapping['no-degree'])
                job_level_selectors.push(google_JobExpMapping['no-experience'])
                break;
            case (Experience.MidSenior):
                job_level_selectors.push(google_JobExpMapping['under3yrs'])
                job_level_selectors.push(google_JobExpMapping['over3yrs'])
                break;
            case Experience.Director:
            case Experience.Executive:
                job_level_selectors.push(google_JobExpMapping['over3yrs'])
                break
        }


        await page.waitForTimeout(3000)
        let requirementsToggle = await page.$('#choice_box_root > div.vk0qtc > div.w0rs6e > span:nth-child(5) > span')
        if (requirementsToggle) {
            await requirementsToggle.click()

            for (let selector of job_level_selectors) {
                await page.waitForTimeout(3000)
                let elementE = await page.$(selector)
                if (elementE)
                    await elementE.click()
            }
        }
        await page.waitForTimeout(3000)
    }
    async setLocationRadius(page:Page,searchRadius: number): Promise<void> {
        await page.waitForTimeout(3000)
        let locationE = await page.$('#choice_box_root > div.vk0qtc > div.w0rs6e > span:nth-child(3) > span')
        if (locationE)
            await locationE.click()
        await page.waitForTimeout(3000)

        let searchRadiusSelector = ''
        for (let radiusMapping of google_SearchRadiusMapping) {
            if (searchRadius >= radiusMapping[0]) {
                searchRadiusSelector = radiusMapping[1]
                console.log('set location radius '+radiusMapping[0])
                break;
            }
        }
        let radius = await page.$(searchRadiusSelector)
        if (radius)
            await radius.click()
        await page.waitForTimeout(3000)

    }
    async setDatePosted(page:Page,datePosted: number): Promise<void> {
        let datePostedSelector = ''
        for (let datePostedMapping of google_DatePostedMapping) {
            if (datePosted >= datePostedMapping[0]) {
                datePostedSelector = datePostedMapping[1]
                break
            }
        }
        await page.waitForTimeout(3000)
        let datePostedDropDown = await page.$('#choice_box_root > div.vk0qtc > div.w0rs6e > span:nth-child(4) > span')
        if (datePostedDropDown)
            await datePostedDropDown.click()
        await page.waitForTimeout(3000)

        let datePostedButton = await page.$(datePostedSelector)
        if (datePostedButton)
            await datePostedButton.click()
        await page.waitForTimeout(3000)
    }


    async scan(page:Page): Promise<string[]> {

        let jobs: string[] = []
        let counter = 2;
        while (true) {  
            await page.waitForTimeout(3000)
            let ulElement = await page.$(`#VoQFxe > div:nth-child(${counter}) > div > ul`)

            if (ulElement) {
                const listItems = await ulElement.$$('li')
                for (let item of listItems) {
                    await item.click()
                    const flexItems = await page.$x('/html/body/div[2]/div/div[2]/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div/g-scrolling-carousel/div[1]/div/span/div');
                    const spanTexts = await flexItems[0].$$eval('a', spans => spans.map(span => span.href));
                    jobs.push(spanTexts[0])


                }
                if (listItems.length < 10) {
                    break;
                }
                counter += 24
                
            }else{
                console.log('no uL element')
                break;
            }
        }

        jobs = jobs.filter((item, index) => {
            return jobs.indexOf(item) == index
        })

        return jobs
    }

}