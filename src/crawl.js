/*
 *
 * crawl.js - Interact with the file system
 *
 * CreateDir  - Create a path if it doesn’t exist
 * RemoveDir  - Removing folders and all it’s sub folders
 * CopyFiles  - Copy a folder
 *
 */


'use strict';


// ---------------------------------------------------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );
const Crawler = require( 'js-crawler' );


/**
 * Crawl - Crawl the site
 *
 * @param  {string} url   - url
 * @param  {number} depth - depth
 * @return {array}        - all the urls
 */
const Crawl = ( url, depth ) => {
	Log.verbose( `🔪  Preparing toppings     - Crawling ${ url }` );

	return new Promise( ( resolve, reject ) => {
		// Configure the crawlers depth and to only test pages on the local url
		const crawler = new Crawler().configure({
			depth,
			shouldCrawl: link => link.indexOf( url ) === 0,
		});

		crawler.crawl({
			url,
			success: () => null,
			failure: ( page ) => {
				if( page.error ) {
					return reject( new Error( page.error ) );
				}
				return null;
			},
			finished: urls => resolve( urls ),
		});
	});
};

module.exports = Crawl;

