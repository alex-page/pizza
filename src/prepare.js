/***************************************************************************************************************************************************************
 *
 * prepare.js - Interact with the file system
 *
 * Prepare    - Create all the necessary directories
 * RemoveDir  - Removing folders and all it’s sub folders
 * CopyFiles  - Copy a folder
 *
 **************************************************************************************************************************************************************/


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log   = require( 'lognana' );
const Fs    = require( 'fs' );
const Path  = require( 'path' );


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const CreateDir = require( './files' ).CreateDir;
const RemoveDir = require( './files' ).RemoveDir;


const Prepare = ( location ) => {
	Log.verbose( '🍥  Spinning the dough     - Creating directories' );
	const directory = {
		default:  location,
		raw:      location + 'raw',
		fixture:  location + 'fixture',
		diff:     location + 'diff',
	}

	// Check if we already have fixtures
	let _fixturesExist = false;
	if( Fs.existsSync( directory.default ) ){
		_fixturesExist = true;
	}

	// Remove the raw and diff dirertory
	RemoveDir( directory.raw );
	RemoveDir( directory.diff );

	// Create the location directory if it doesn't exist
	Object.values( directory ).map( dir => {
		CreateDir( dir );
	});

	return _fixturesExist;
};


module.exports = Prepare;
