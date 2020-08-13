import {chromium} from 'playwright';
import {promises as fsPromise} from 'fs';
import playwrightVideo from 'playwright-video';

const {mkdir} = fsPromise;

const artifactsFolder = 'test-output'

await mkdir(artifactsFolder, {recursive: true});

console.log('Launching Chrome');

const browser = await chromium.launch({
	headless: false,
	slowMo: 100
});
const context = await browser.newContext();
const page = await context.newPage();
await playwrightVideo.saveVideo(page, `${artifactsFolder}/video.mp4`);

await page.goto('https://smashingconf.com/online-workshops/');
await page.click(`[href$="/speakers"]`);
await page.click(`[href$="/workshops"]`);
await page.click(`[href$="/software"]`);
await page.click(`[href$="/talks"]`);
await browser.close();

console.log('Closing browser');
