// To do:

// Takes:
// - URL ( Will be crawled to get all URL's )
// - Web page dimensions
// - Folder for visual diff ( creates 3 dirs inside )

// Crawl a website and get all of it's URLS
// Take a screenshot of a URL with a set width/height
// Save the screenshot into a directory ( one for master, one for compare )
// If there is one in master and compare do a diff
// Create a diff directory


const Screenshot = require( './src/screenshot' );

Screenshot( [ 'http://alexpage.com.au', 'https://github.com/alex-page' ] );
