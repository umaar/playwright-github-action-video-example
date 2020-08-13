import {chromium} from 'playwright';
import {promises as fsPromise} from 'fs';
import playwrightVideo from 'playwright-video';

const {mkdir} = fsPromise;

const artifactsFolder = 'test-output'

await mkdir(artifactsFolder, {recursive: true});

console.log('Launching Chrome');

const browser = await chromium.launch({
	headless: true,
	slowMo: 100
});

const context = await browser.newContext();
const page = await context.newPage();
page.setDefaultTimeout(5000);

const capture = await playwrightVideo.saveVideo(page, `${artifactsFolder}/video.mp4`);

try {
	await page.goto('https://smashingconf.com/online-workshops/');
	await page.click(`[href$="/speakers"]`);
	await page.click(`[href$="/workshops"]`);
	await page.click(`[href$="/software"]`);
	await page.click(`[href$="/talks"]`);	
} finally {
	await capture.stop();
	await browser.close();
	console.log('Closed browser');
}