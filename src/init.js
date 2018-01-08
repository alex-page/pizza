/***************************************************************************************************************************************************************
 *
 * init.js
 *
 * Initialise the pizza
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log        = require( './helper' ).Log;
const Screenshot = require( './screenshot' );


// Check if the user is in verbose mode
if(process.argv.includes('-v') || process.argv.includes('--verbose')) {
	Log.verboseMode = true;
};


// Log the welcome message then run the scheduled jobs
Promise.resolve( Log.welcome( 'Starting up pizza' ) )
	.then( () => {

		Screenshot( [ 'http://alexpage.com.au', 'https://github.com/alex-page' ] );

	})
	.catch( error => Log.error( error ) );


// Maybe scrape the website for all of the URL's
// Take an object of URL's and widths
// Create directories if they don't exist [ pizza/current-date, pizza/comparison ]
// If there is only one directory with a date then add the screenshots to that directory
// - end process saying it needs images to compare against
// If pizza has multiple date directories
// - add screenshots to pizza/current-date
// - clear the comparison folder
// - add the comparision images
// - log the diff if possible
