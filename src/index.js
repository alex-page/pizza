/***************************************************************************************************************************************************************
 *
 * index.js
 *
 * Make the Pizza 🍕
 *
 **************************************************************************************************************************************************************/


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Puppeteer = require( 'puppeteer' );
const Log       = require( 'lognana' );
const CFonts    = require( 'cfonts' );


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Screenshot = require( './screenshot' );


const pizza = CFonts.render( 'Pizza', {
	// font: '3d',
	align: 'center',
	colors: [ 'yellow', 'red' ]
}).string;


// Log settings and check if the user is in verbose mode
Log.emoji = '🍕';
if(process.argv.includes('-v') || process.argv.includes('--verbose')) {
	Log.verboseMode = true;
};


console.log( pizza );
Log.welcome( 'Making the pizza!' );


/*
 * GetURLs - Get the urls
 */
const GetURLs = ( url ) => {
	return [ 'http://alexpage.com.au', 'https://github.com/alex-page' ];
};

/**
 * Initialise - Start the visual regression testing
 */
const Initialise = async () => {
	Log.verbose( `Initialise() - Spinning the dough` );

	const urls    = GetURLs( 'http://alexpage.com.au' );

	Log.verbose( `Initialise() - Lathering on the sauce` );
	const browser = await Puppeteer.launch(); // Start puppeteer headless browser

	urls.forEach( url => {
		Screenshot( browser, url );
	});

	Log.verbose( `Initialise() - Putting the pizza into the 🔥` );
	await browser.close();
}


Initialise();
