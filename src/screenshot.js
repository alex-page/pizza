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


/**
 * Screenshot - Take a screenshot of an array of URLs
 *
 * @param  {string} pathToFile - The path to the file which will be read
 *
 * @return {string}            - Resolves the contents of the file
 */
const Screenshot = async ( urls, width, height ) => {

	const browser = await Puppeteer.launch(); // Start puppeteer instance

	for ( let url of urls ) {

		const page = await browser.newPage();  // Create a new page

		try {
			await page.goto( url );

			const dimensions = {
				height: height || await page.evaluate( () => document.documentElement.offsetHeight ),
				width:  width || 1200,
			};

			page.setViewport( dimensions ); // Apply the dimensions to the page

			const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '__');

			await page.screenshot({ path: `screenshots/${ filename }[${ dimensions.width }].png` });
		}
		catch( error ) {
			return error;
		}

		await page.close();

	}

	await browser.close();

};

module.exports = Screenshot;
