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

console.log( Puppeteer.launch() );

/**
 * Screenshot - Take a screenshot of an array of URLs
 *
 * @param  {string} pathToFile - The path to the file which will be read
 *
 * @return {string}            - Resolves the contents of the file
 */
const Screenshot = async ( url, width, height ) => {

	// return new Promise( ( resolve, reject ) => {
	// 	resolve();
	// })

	const browser = await Puppeteer.launch(); // Start puppeteer instance
	const page    = await browser.newPage();  // Create a new page

	await page.goto( url );

	const dimensions = {
		height: height || await page.evaluate( () => document.documentElement.offsetHeight ),
		width:  width || 1200,
	};

	page.setViewport( dimensions ); // Apply the dimensions to the page

	const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '__');

	await page.screenshot({ path: `__tests__/tmp/${ filename }[${ dimensions.width }].png` });

	await browser.close();
};

Screenshot( 'https://alexpage.com.au' );
