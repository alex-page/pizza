/***************************************************************************************************************************************************************
 *
 * index.js - Where the magic happens
 *
 * Initialise() - Make the Pizza 🍕
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Puppeteer = require( 'puppeteer' );
const Log       = require( 'indent-log' );
const Path      = require( 'path' );


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Screenshot  = require( './screenshot' );
const Prepare     = require( './prepare' );
const Crawl       = require( './crawl' );
const Compare     = require( './compare' );
const SETTINGS    = require( './settings' );


// indent-log settings and check if the user is in verbose mode
Log.flags = {
	banner:  ` 🍕 🍕 🍕  `,
	error:   ` 🍕   🔥  ERROR: `,
	info:    ` 🍕   🔔  INFO: `,
	ok:      ` 🍕   👍  `,
	done:    ` 🍕   🚀  DONE: `,
	time:    ` 🍕   🕐  [${ Log.Style.bold('#timestamp#') }]`,
	verbose: ` 🍕   😬  VERBOSE: `,
};
if( process.argv.includes( '-v' ) || process.argv.includes( '--verbose' ) ) {
	Log.verboseMode = true;
};


// Log the welcome message
console.log( SETTINGS.get().type.title + SETTINGS.get().type.subtitle );
Log.banner( 'Lets‘a make‘a the pizza!' );


/**
 * Pizza - Start the visual regression testing
 *
 * @param  {object} settings - The settings that contains url and width
 */
const Pizza = async ( settings ) => {
	Log.verbose( `☁️️  Kneading the dough     - Starting test` );
	Prepare( settings.directories );

	const urls = await Crawl( settings.urls[ 0 ], 3 );

	Log.verbose( `🍅  Lathering on the sauce - Start puppeteer` );
	const browser = await Puppeteer.launch();

	// For each URL and width add a job to the queue
	return urls.map( ( url ) => {
		settings.widths.map( async ( width ) => {

			// Get the file name add it to the files
			const filename = url.replace( /(^\w+:|^)\/\//, '' ).replace( /\//g, '_' );
			const file     = `${ filename }${ width }.png`;

			// Screenshot the website then compare it to the fixture
			await Screenshot( browser, file, url, width );
			await Compare( file, settings.directories, SETTINGS.get().visualDiff );

		})
	});


	// Take screenshots and compare
	await Promise.all( screenshotJob )
		.catch( error   => Log.error( error.message ) );

	// await Promise.all( compareJob )
	// 	.catch( error   => Log.error( error.message ) );

	Log.verbose( `🔥  Paddling into oven     - Closing puppeteer ` );
	await browser.close();
};


(() => {
	try {
		Pizza( SETTINGS.get().pizza );
	}
	catch( error ) {
		Log.error( `Theres no cheesy crust, I SAID CHEESY CRUST IS IMPORTANT - Dominik` );
		Log.error( error.message );
	}
})()
