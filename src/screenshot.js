/***************************************************************************************************************************************************************
 *
 * Take a screenshot of a website.
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
 * @param  {string} pathToFile - The path to the file which will be read
 *
 * @return {string}            - Resolves the contents of the file
 */
const Screenshot = async ( browser, url, width, height ) => {
	Log.verbose( `Screenshot() - Adding ${ url } to the pizza` );

	try {
		const page = browser.newPage();
		await page.goto( url );

		const dimensions = {
			height: height || await page.evaluate( () => document.documentElement.offsetHeight ),
			width:  width  || 1200,
		};

		page.setViewport( dimensions ); // Apply the dimensions to the page

		const filename = ( url.replace(/(^\w+:|^)\/\//, '' ) ).replace( '/', '__');

		await page.screenshot({ path: `pizza/compare/${ filename }[${ dimensions.width }].png` });

		Log.verbose( `Screenshot() - Topping ${ url } added to the pizza` );

		await page.close();
	}
	catch( error ) {
		Log.error( error.message );

		await page.close();
	}

};

module.exports = Screenshot;
