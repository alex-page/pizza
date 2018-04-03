/***************************************************************************************************************************************************************
 *
 * compare.js - Where the magic happens
 *
 * VisualDiff() - Visual diff the two images 👀
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log           = require( 'indent-log' );
const CompareImages = require( 'resemblejs/compareImages' );
const Fs            = require( "mz/fs" );


/**
 * Compare -
 *
 * @param  {array}   files   - The file names to compare
 *
 */
const Compare = ( filename, directories, visualDiffOptions ) => {
	Log.verbose( `👀  Inspecting the crust   - Comparing ${ filename }` );

	return new Promise( async ( resolve, reject ) => {

		const rawFile     = await Fs.readFile( directories.raw + filename );
		const fixtureFile = await Fs.readFile( directories.fixture + filename );

		try {
			const data = await CompareImages( rawFile, fixtureFile, visualDiffOptions );

			// await Fs.writeFile( directories.diff + filename, data.getBuffer());

			resolve();
		}
		catch( error ) {
			reject( error );
		}
	});
};


module.exports = Compare;
