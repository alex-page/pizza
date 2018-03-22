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
const Log = require( 'lognana' );


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
const Screenshot = async ( browser, url, width ) => {
	Log.verbose( `🧀  Toppings thrown on     - Prepare screenshot ${ url } : ${ width }` );

	try {
		// Create a new page and go to the URL
		const page = await browser.newPage();
		await page.goto( url );

		// Get the page dimensions
		const dimensions = {
			height: await page.evaluate( () => document.documentElement.offsetHeight ),
			width:  width,
		};

		// Apply the dimensions to the page
		page.setViewport( dimensions );

		// Save the screenshot
		const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '_');
		await page.screenshot({ path: `${ SETTINGS.get().pizza.directory }raw/${ filename }-${ dimensions.width }.png` });

		// Close the page
		Log.verbose( `👍  Toppings look good     - Screenshot taken ${ url } : ${ width }` );
		await page.close();
	}
	catch( error ) {

		Log.error( error.message );

		await page.close();
	}
};


module.exports = Screenshot;
