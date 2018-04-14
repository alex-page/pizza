/*
 *
 * index.js - Where the magic happens
 *
 * Initialise() - Make the Pizza 🍕
 *
 */


'use strict';


// ---------------------------------------------------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------------------------------------------------
const Puppeteer = require( 'puppeteer' );
const Log = require( 'indent-log' );
const CFonts = require( 'cfonts' );


// ---------------------------------------------------------------------------------------------------------------------
// Local
// ---------------------------------------------------------------------------------------------------------------------
const Screenshot = require( './screenshot' );
const Prepare = require( './prepare' );
const Crawl = require( './crawl' );
const Compare = require( './compare' );
const SETTINGS = require( './settings' );
const { FileName } = require( './files' );


// indent-log settings and check if the user is in verbose mode
Log.flags = {
	banner:  ' 🍕 🍕 🍕   ',
	error:   ' 🍕   🔥  ERROR: ',
	info:    ' 🍕   🔔  INFO: ',
	ok:      ' 🍕   👍  ',
	done:    ' 🍕   🚀  DONE: ',
	time:    ` 🍕   🕐  [${ Log.Style.bold( '#timestamp#' ) }]`,
	verbose: ' 🍕   😬  VERBOSE: ',
};

if( process.argv.includes( '-v' ) || process.argv.includes( '--verbose' ) ) {
	Log.verboseMode = true;
}


// Log the welcome message
CFonts.say( 'Pizza', {
	align:  'center',
	colors: [ 'yellow', 'red' ],
});

CFonts.say( '- Visual regression testing that is tasty and cheesy -', {
	font:   'console',
	align:  'center',
	colors: [ 'yellow' ],
});

Log.banner( 'Lets‘a make‘a the pizza!' );


/**
 * Pizza - Start the visual regression testing
 *
 * @param  { object } settings - The settings that contains url and width
 */
const Pizza = async ( settings ) => {
	try {
		Log.verbose( '☁️️  Kneading the dough     - Starting test' );
		Prepare( settings.directories );

		const urls = await Crawl( settings.urls[ 0 ], 2 );

		// Iterate through urls and widths to create a set of different options for screenshots
		let options = urls.map( url => settings.widths.map( width => ({
			url,
			width,
			filename: FileName( url, width, 'chrome' ),
		}) ) );

		// Flatten the options
		options = [].concat( ...options );

		// Start the browser
		Log.verbose( '🍅  Lathering on the sauce - Start puppeteer' );
		const browserInstance = await Puppeteer.launch();

		// Iterated through the options and screenshot and compare
		await Promise.all( options.map( async ( option ) => {
			await Screenshot( browserInstance, option.url, option.width, option.filename );
			await Compare( option.filename, settings.directories, SETTINGS.get().visualDiff );
		}) );

		// Close the browser instance
		Log.verbose( '🔥  Paddling into oven     - Closing puppeteer ' );
		await browserInstance.close();
	}
	catch( error ) {
		Log.error( error.message );
		console.log( error ); // eslint-disable-line
	}
};


( () => {
	try {
		Pizza( SETTINGS.get().pizza );
	}
	catch( error ) {
		Log.error( 'Theres no cheesy crust... I specifically said cheesy crust is important!' );
		Log.error( error.message );
	}
})();
