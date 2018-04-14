/*
 *
 * compare.js - Where the magic happens
 *
 * VisualDiff() - Visual diff the two images 👀
 *
 */


'use strict';


// ---------------------------------------------------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );
const CompareImages = require( 'resemblejs/compareImages' );


//----------------------------------------------------------------------------------------------------------------------
// Local
//----------------------------------------------------------------------------------------------------------------------
const { ReadFile, WriteFile } = require( './files' );


/**
 * Compare - Does this
 *
 * @param  {string}  filename             - Filename
 * @param  {string}  directories          - Directories
 * @param  {object}  visualDiffOptions    - Options for diff
 *
 * @return {promise}                      - Returns value
 */
const Compare = ( filename, directories, visualDiffOptions ) => {
	Log.verbose( `👀  Inspecting the crust   - Comparing ${ filename }` );

	return new Promise( async ( resolve, reject ) => {
		const rawFile = await ReadFile( directories.raw + filename );
		const fixtureFile = await ReadFile( directories.fixture + filename );

		try {
			const data = await CompareImages( rawFile, fixtureFile, visualDiffOptions );

			await WriteFile( directories.diff + filename, data.getBuffer() );

			resolve();
		}
		catch( error ) {
			reject( error );
		}
	});
};


module.exports = Compare;
