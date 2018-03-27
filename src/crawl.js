/***************************************************************************************************************************************************************
 *
 * crawl.js - Interact with the file system
 *
 * CreateDir  - Create a path if it doesn’t exist
 * RemoveDir  - Removing folders and all it’s sub folders
 * CopyFiles  - Copy a folder
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log        = require( 'indent-log' );
const Crawler    = require( 'js-crawler' );


const Crawl = ( url, depth ) => {
	Log.verbose( `Crawling ${ url }` );

	// Configure the crawlers depth and to only test pages on the local url
	var crawler = new Crawler().configure({
		depth: depth,
		shouldCrawl: ( link ) => link.indexOf( url ) === 0,
	});

	return new Promise( ( resolve, reject ) => {

		crawler.crawl({
			url: url,
			success:  ( page ) => null,
			failure:  ( page ) => Log.error( `${ page.status } error: ${ page.url }`  ),
			finished: ( urls ) => {
				resolve( urls );
			},
		})

	})
}

module.exports = Crawl;

