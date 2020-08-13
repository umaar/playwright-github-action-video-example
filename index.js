import {chromium} from 'playwright';
import {promises as fsPromise} from 'fs';
import playwrightVideo from 'playwright-video';

const {mkdir} = fsPromise;

function sleep(ms = 1000) {return new Promise((resolve) => setTimeout(resolve, ms))};

const artifactsFolder = 'test-output'

await mkdir(artifactsFolder, {recursive: true});

console.log('Launching Chrome');

const browser = await chromium.launch({
	headless: true
});
const context = await browser.newContext();
const page = await context.newPage();
await playwrightVideo.saveVideo(page, `${artifactsFolder}/video.mp4`);

await page.goto('https://example.com');

await sleep();

await page.screenshot({
	path: `${artifactsFolder}/screenshot.png`
});

await sleep();
await browser.close();