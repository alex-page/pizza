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
const Log           = require( 'lognana' );
const CompareImages = require('resemblejs/compareImages');



/**
 * Compare -
 *
 * @param  {array}   files   - The file names to compare
 *
 */
const CompareBulk = async ( files ) => {
	Log.verbose( `👀  Inspecting the crust   - Comparing ${ files.length } files` );

	const comparisons = [];
	files.map( file => {
		comparisons.push( Compare( file ) );
	});


	// Take screenshots
	await Promise.all( comparisons )
		.catch( error   => Log.error( error.message ) );
};


module.exports = CompareBulk;
