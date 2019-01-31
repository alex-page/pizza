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
const { PNG } = require( 'pngjs' );
const PixelMatch = require( 'pixelmatch' );
const Fs = require( 'fs' );


/**
 * Compare - Does this
 *
 * @param  {string}  filename             - Filename
 * @param  {string}  directories          - Directories
 * @param  {object}  visualDiffOptions    - Options for diff
 *
 * @return {promise}                      - Returns value
 */
const Compare = ( filename, directories ) => {
	Log.verbose( `👀  Inspecting the crust   - Comparing ${ filename }` );

	return new Promise( async ( resolve, reject ) => {
		const rawFile = await Fs
			.createReadStream( directories.raw + filename )
			.pipe( new PNG() );
		const fixtureFile = await Fs
			.createReadStream( directories.fixture + filename )
			.pipe( new PNG() );

		try {
			const diff = new PNG({ width: rawFile.width, height: rawFile.height });

			PixelMatch(
				rawFile.data,
				fixtureFile.data,
				diff.data,
				rawFile.width,
				rawFile.height,
				{
					threshold: 0.1,
				},
			);

			diff.pack()
				.pipe( Fs.createWriteStream( directories.diff + filename ) );

			resolve();
		}
		catch( error ) {
			reject( error );
		}
	});
};


module.exports = Compare;
