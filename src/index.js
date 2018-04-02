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
const FileName    = require( './files' ).FileName;



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

	try {
		Log.verbose( `☁️️  Kneading the dough     - Starting test` );
		Prepare( settings.directories );

		const urls = await Crawl( settings.urls[ 0 ], 1 );

		Log.verbose( `🍅  Lathering on the sauce - Start puppeteer` );
		const browserInstance = await Puppeteer.launch();

		// Screenshot the website then compare it to the fixture
		for( const url of urls ) {
			for ( const width of settings.widths ) {
				await Screenshot( browserInstance, url, width, FileName( url, width, 'chrome' ) );
				await Compare( FileName( url, width, 'chrome' ), settings.directories, SETTINGS.get().visualDiff );
			}
		};

		Log.verbose( `🔥  Paddling into oven     - Closing puppeteer ` );
		await browserInstance.close();
	}
	catch( error ){
		Log.error( error );
	}
};


(() => {
	try {
		Pizza( SETTINGS.get().pizza );
	}
	catch( error ) {
		Log.error( `Theres no cheesy crust... I specifically said cheesy crust is important!` );
		Log.error( error.message );
	}
})()
