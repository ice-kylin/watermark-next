import puppeteer from 'puppeteer';

// Function to capture screenshot
async function captureScreenshot(outputPath) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setRequestInterception(true);

	page.on('request', (request) => {
		let data = {
			method: 'POST',
			postData: 'qww=qqq'
		};

		request.continue(data);
	});

	const response = await page.goto('http://localhost:5173/theme/m3');
	const responseBody = await response.text();
	console.log(responseBody);
	const element = await page.$('.watermark-container');
	await element.screenshot({
		path: outputPath,
		type: 'jpeg',
		captureBeyondViewport: true,
		quality: 100
	});
	await browser.close();
}

// Main function to process image
async function processImage(outputImagePath) {
	await captureScreenshot(outputImagePath);
	console.log('Watermarked image generated successfully.');
}

// Usage example
const outputImagePath = './image.jpeg';
processImage(outputImagePath);
