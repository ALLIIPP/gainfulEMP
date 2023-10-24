import { Page } from "puppeteer";
import {
    Experience,
    glassdoor_DatePostedMapping,
    glassdoor_SearchRadiusMapping,
    glassdoor_DropDownSelector,
    glassdoor_SeniorityLevelSelector,
    glassdoor_JobExpMapping,
    glassdoor_ApplyFilterButtonSelector,
    glassdoor_DateDropDownSelector,
    glassdoor_DistanceLevelSelector,
    glassdoor_TotalJobCountSelector,
    glassdoor_ClosePopUpSelector,
    glassdoor_MoreJobsButtonSelector,
    glassdoor_ulSelector
} from "../constants/constants";
import { Site } from "./sites";

export class Glassdoor implements Site {

    async setSearchTerm(page:Page,term: string): Promise<void> {
        const searchInput = await page.$('#searchBar-jobTitle');
        if (searchInput) {
            await searchInput.click()
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await searchInput.type(term);
            await searchInput.press('Enter');
        }
        await page.waitForTimeout(3000)
    }


    async setLocation(page:Page,location: string): Promise<void> {
        const locationInput = await page.$('#searchBar-location');
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

    async setExperienceLevel(page:Page,experienceLevel: Experience): Promise<void> {

        let dropDown = await page.$(glassdoor_DropDownSelector)
        if (dropDown) {
            await dropDown.click()
            await page.waitForTimeout(2000)
            let seniorityLevel = await page.$(glassdoor_SeniorityLevelSelector)
            if (seniorityLevel) {
                await seniorityLevel.click()
                await page.waitForTimeout(2000)
                let levelFilterContainer = await page.$('#app-navigation > div.my-0.mx-auto.container-max-width.Page_fullHeight___P3Un > div.SearchFiltersBar_filtersBar__vtPDo > div:nth-child(1) > div > div > div:nth-child(11) > div:nth-child(2) > ul')
                if (levelFilterContainer) {
                    let listItems = await levelFilterContainer.$$('li')
                    for (let i = 0; i < listItems.length; i++) {
                        const spanTexts = await listItems[i].$$eval('div', spans => spans.map(div => div.textContent));
                        if (spanTexts[0]?.toLowerCase().includes(experienceLevel.toLocaleLowerCase())) {
                            let button = await page.$(glassdoor_JobExpMapping[i])
                            if (button)
                                await button.click()
                        }
                    }
                }
            }
        }
        await page.waitForTimeout(5000)
        let applyFilterButton = await page.$(glassdoor_ApplyFilterButtonSelector)
        if (applyFilterButton)
            applyFilterButton.click()
        await page.waitForTimeout(5000)

    }
    async setLocationRadius(page:Page,radius: number): Promise<void> {

        let dropDown = await page.$(glassdoor_DropDownSelector)
        if (dropDown) {
            await dropDown.click()
            let searchRadiusSelector = ''
            for (let radiusMapping of glassdoor_SearchRadiusMapping) {
                if (radius > radiusMapping[0]) {
                    searchRadiusSelector = radiusMapping[1]
                    break
                }
            }

            let distanceDropDown = await page.$(glassdoor_DistanceLevelSelector)
            if (distanceDropDown)
                distanceDropDown.click()

            await page.waitForTimeout(2000)
            let radiusButton = await page.$(searchRadiusSelector)
            if (radiusButton) {
                await radiusButton.click()
            }

        }
        await page.waitForTimeout(5000)
        let applyFilterButton = await page.$(glassdoor_ApplyFilterButtonSelector)
        if (applyFilterButton)
            applyFilterButton.click()
        await page.waitForTimeout(3000)

    }



    async setDatePosted(page:Page,datePosted: number): Promise<void> {
        let datePostedSelector = ''
        for (let date of glassdoor_DatePostedMapping) {
            if (datePosted >= date[0]) {
                datePostedSelector = date[1]
                break;
            }
        }
        await page.waitForTimeout(5000)
        let whenButton = await page.$(glassdoor_DateDropDownSelector)
        if (whenButton)
            await whenButton.click()

        await page.waitForTimeout(5000)
        let date = await page.$(datePostedSelector)
        if (date)
            await date.click()
        await page.waitForTimeout(3000)
    }
    async scan(page:Page): Promise<string[]> {

        let jobs: string[] = []

        let jobCount = await page.$eval(glassdoor_TotalJobCountSelector, (element) => {
            return element.textContent
        })
        let howMany = jobCount ? Number.parseInt(jobCount.split(' ')[0]) : 0

        let counter = 20;
        while (counter < howMany) {
            let closeDumbPopUpBtn = await page.$(glassdoor_ClosePopUpSelector)
            if (closeDumbPopUpBtn) {
                await page.waitForTimeout(5000);
                closeDumbPopUpBtn.click()
            }

            let moreJobsBtn = await page.$(glassdoor_MoreJobsButtonSelector)
            if (moreJobsBtn) {
                await moreJobsBtn.click()
                await page.waitForTimeout(5000)
                counter += 20
            } else {
                console.log('breaked')
                break;
            }
        }

        let ulElement = await page.$(glassdoor_ulSelector)
        if (ulElement) {
            const listItems = await ulElement.$$('li')
            for (let item of listItems) {
                const aTexts = await item.$$eval('a', a => a.map(a => a.href));
                console.log(aTexts)
                try {
                    if (aTexts.length == 2) {
                        jobs.push(aTexts[0])
                    }
                } catch (e) {
                    console.log('links empty')
                }

            }
        }
        return jobs
    }
}