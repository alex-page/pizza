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
const Log       = require( 'lognana' );


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Screenshot = require( './screenshot' );
const Prepare    = require( './prepare' );
const SETTINGS   = require( './settings' );


// Lognana settings and check if the user is in verbose mode
Log.emoji = '🍕';
if( process.argv.includes( '-v' ) || process.argv.includes( '--verbose' ) ) {
	Log.verboseMode = true;
};


// Log the welcome message
console.log( SETTINGS.get().type.title + SETTINGS.get().type.subtitle );
Log.welcome( 'Lets‘a make‘a the pizza!' );


/**
 * Pizza - Start the visual regression testing
 *
 * @param  {object} settings - The settings that contains url and width
 */
const Pizza = async ( settings ) => {
	Log.verbose( `☁️️  Kneading the dough     - Starting test` );
	Prepare( SETTINGS.get().pizza.directory );

	Log.verbose( `🍅  Lathering on the sauce - Start puppeteer` );
	const browser = await Puppeteer.launch();

	// For each URL and width take a screenshot of the page
	const screenshotTasks = [];
	settings.urls.map( url => settings.widths.map( width => {
		screenshotTasks.push( Screenshot( browser, url, width ) );
	}));

	await Promise.all( screenshotTasks )
		.catch( error => Log.error( error.message ) );


	Log.verbose( `🔥  Paddling into oven     - Closing puppeteer ` );
	await browser.close();
};


Pizza( SETTINGS.get().pizza );
