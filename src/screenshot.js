/***************************************************************************************************************************************************************
 *
 * screenshot.js - Take screenshots in a headless browser
 *
 * Screenshot - Take a screenshot of a page and save it
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const SETTINGS = require( './settings' );


/**
 * Screenshot - Take a screenshot of a page
 *
 * @param  {function} browser - The puppeteer browser instance
 * @param  {string}   url     - The url of the page
 * @param  {number}   width   - The width of the page
 */
const Screenshot = ( browser, file, url, width ) => {
	Log.verbose( `🧀  Mozzarella scattered   - Prepare screenshot ${ file }` );

	return new Promise( async ( resolve, reject ) => {
		try {
			// Create a new page and go to the URL
			const page = await browser.newPage();
			await page.goto( url );

			// Changing the width so we can measure the height of the page for that width
			page.setViewport({
				height: 10,
				width,
			});

			const height = await page.evaluate( () => document.documentElement.scrollHeight );

			// Apply the dimensions to the page
			page.setViewport({
				height,
				width,
			});

			// Save the screenshot
			await page.screenshot({ path: `${ SETTINGS.get().pizza.directories.raw }/${ file }` });

			// Close the page
			Log.verbose( `🍃  Basil sprinkled        - Screenshot taken ${ file }` );
			await page.close();
			resolve();
		}
		catch( error ) {
			await page.close();
			reject( error );
		}
	});
};


module.exports = Screenshot;
