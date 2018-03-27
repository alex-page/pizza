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
const Compare = ( file, directories, visualDiffOptions ) => {
	Log.verbose( `👀  Inspecting the crust   - Comparing ${ file }` );

	return new Promise( async ( resolve, reject ) => {

		try {
			const data = await CompareImages(
				await Fs.readFile( directories.raw + file ),
				await Fs.readFile( directories.fixture + file ),
				visualDiffOptions
			);

			await Fs.writeFile( directories.diff + file, data.getBuffer());

			resolve();
		}
		catch( error ) {
			reject( error );
		}
	});
};


module.exports = Compare;
