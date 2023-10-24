# Job Finder

This is a (very buggy) program that will collect all the different jobs from various websites under a given set of constraints so that they can be easily parsed by an end user.

## Installation

this program is written in typescript, so node, typescript, and ts-node are required 

```bash
npm install typescript
npm install ts-node
```

## Usage


populate the .env file with the following values

LOCATION => the location of the jobs to search for (ex. Chicago Illinois) 
SEARCH_TERMS => a comma seperated list of terms to search for (ex. nurse,doctor,lawyer,hvac,plumber)
SEARCH_RADIUS => the search radius around the location in miles (ex. [any positive integer])
JOB_LEVEL => the skill level required for the job, there are 5 valid values that can be passed() : INTERNSHIP,ENTRY,MID-SENIOR,DIRECTOR,EXECUTIVE
DATE_POSTED => the maximum age of a job listing in days (ex. [any positive integer])

to run the script
```bash
ts-node ./src/index.ts [WEBSITE]
```
where [WEBSITE] is one of the following: google,glassdoor,indeed,linkedin


when the program completes, it will populate 2 different files: ./scr/_links_raw/[WEBSITE].json , and ./src/_todo/[WEBSITE].json.

The ./src/_links_raw/[WEBSITE].json file stores all the jobs found under any criteria for a given website (this is here so that we dont see the same job twice).

The ./src/_todo/[WEBSITE].json file is used in conjunction with our other script that makes evaluating jobs easier/faster.

to run the evaluator script
```bash
ts-node ./src/work.ts [WEBSITE]
```
where [WEBSITE] is one of the following: google,glassdoor,indeed,linkedin

this script pulls 10 links from the ./src/_todo/[WEBSITE].json file and opens them in a chromium browser. When you are done evaluating each job, close the browser and those links will be removed from the file. To open the next 10 links, run the same command again.
