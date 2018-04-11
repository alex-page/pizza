/*
 *
 * screenshot.js - Take screenshots in a headless browser
 *
 * Screenshot - Take a screenshot of a page and save it
 *
 */


'use strict';


// ---------------------------------------------------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );


// ---------------------------------------------------------------------------------------------------------------------
// Local
// ---------------------------------------------------------------------------------------------------------------------
const SETTINGS = require( './settings' );


/**
 * Screenshot - Take a screenshot of a page
 *
 * @param  {function} browser  - The puppeteer browser instance
 * @param  {string}   url      - The url of the page
 * @param  {number}   width    - The width of the page
 * @param  {string}   filename - The filename to save it as
 * @return {object}            - Successful screenshots done
 */
const Screenshot = ( browser, url, width, filename ) => {
	Log.verbose( `🧀  Mozzarella scattered   - Prepare screenshot ${ filename }` );

	return new Promise( async ( resolve, reject ) => {
		try {
			// Create a new page and go to the URL
			const page = await browser.newPage();
			await page.goto( url );

			// Changing the width so we can measure the height of the page for that width
			page.setViewport({ height: 10, width });

			// Get Height - document is not defined but is a html value inside page.evaluate
			const height = await page.evaluate( () => document.documentElement.scrollHeight ); // eslint-disable-line

			// Apply the dimensions to the page
			page.setViewport({ height, width });

			// Save the screenshot
			await page.screenshot({ path: `${ SETTINGS.get().pizza.directories.raw }/${ filename }` });

			// Close the page
			await page.close();

			// Jobs done resolve promise
			Log.verbose( `🍃  Basil sprinkled        - Screenshot taken ${ filename }` );
			resolve();
		}

		catch( error ) {
			reject( error );
			throw( error );
		}
	});
};


module.exports = Screenshot;
