/***************************************************************************************************************************************************************
 *
 * screenshot.js
 *
 * Screenshot - Take a screenshot of a page
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log = require( 'lognana' );


/**
 * Screenshot - Take a screenshot of a page
 *
 * @param  {function} browser - The puppeteer browser instance
 * @param  {string}   url     - The url of the page
 * @param  {number}   width   - The width of the page
 */
const Screenshot = async ( browser, url, width ) => {
	Log.verbose( `🧀  Toppings thrown on     - Prepare screenshot ${ url } | [ ${ width } ]` );

	try {
		const page = await browser.newPage();
		await page.goto( url );

		// Get the page dimensions
		const dimensions = {
			height: await page.evaluate( () => document.documentElement.offsetHeight ),
			width:  width,
		};

		// Apply the dimensions to the page
		await page.setViewport( dimensions );

		const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '__');

		await page.screenshot({ path: `pizza/compare/${ filename }[${ dimensions.width }].png` });

		Log.verbose( `👍  Toppings look good     - Screenshot taken ${ url } [ ${ width } ]` );

		await page.close();
	}
	catch( error ) {

		Log.error( error.message );

		await page.close();
	}
};


module.exports = Screenshot;
