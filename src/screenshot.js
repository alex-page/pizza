/***************************************************************************************************************************************************************
 *
 * Take a screenshot of a website.
 *
 * Screenshot - Take a screenshot of an array of URLs
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Puppeteer = require( 'puppeteer' );


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log        = require( './helper' ).Log;


/**
 * Screenshot - Take a screenshot of an array of URLs
 *
 * @param  {string} pathToFile - The path to the file which will be read
 *
 * @return {string}            - Resolves the contents of the file
 */
const Screenshot = async ( urls, width, height ) => {
	Log.verbose( `Screenshot() - Taking screenshot of ${ urls.length } pages`);

	const browser = await Puppeteer.launch(); // Start puppeteer instance

	for ( let url of urls ) {

		const page = await browser.newPage();  // Create a new page
		Log.verbose( `Screenshot() - Opened new page`);

		try {
			await page.goto( url );
			Log.verbose( `Screenshot() - Opened page [ ${ url } ]`);

			const dimensions = {
				height: height || await page.evaluate( () => document.documentElement.offsetHeight ),
				width:  width || 1200,
			};
			Log.verbose( `Screenshot() - Got dimensions [ ${ dimensions.height } x ${ dimensions.width } ]`);

			const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '__');

			await page.setViewport( dimensions ); // Apply the dimensions to the page
			Log.verbose( `Screenshot() - Applied dimensions [ ${ dimensions.height } x ${ dimensions.width } ]`);

			await page.screenshot({ path: `screenshots/${ filename }[${ dimensions.width }].png` });
			Log.verbose( `Screenshot() - Screenshot taken [ ${ url } ]`);
		}
		catch( error ) {
			return error;
		}

		await page.close();
		Log.verbose( `Screenshot() - Page closed [ ${ url } ]`);

	}

	await browser.close();

};


module.exports = Screenshot;
