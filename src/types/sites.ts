import { Page } from "puppeteer";
import { Experience } from "../constants/constants";

export interface Site {
    setSearchTerm(page:Page, term: string): Promise<void>;
    setLocation(page:Page, location: string): Promise<void>;
    setExperienceLevel(page:Page, experienceLevel: Experience): Promise<void>,
    setLocationRadius(page:Page, searchRadius: number): Promise<void>,
    setDatePosted(page:Page, datePosted: number): Promise<void>
    scan(page:Page): Promise<string[]>
}