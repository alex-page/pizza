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
const Log   = require( 'indent-log' );
const Fs    = require( 'fs' );
const Path  = require( 'path' );


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const SETTINGS  = require( './settings' );
const CreateDir = require( './files' ).CreateDir;
const RemoveDir = require( './files' ).RemoveDir;


const Prepare = ( directories ) => {
	Log.verbose( '🍥  Spinning the dough     - Creating directories' );

	// Check if we already have fixtures
	let _fixturesExist = false;
	if( Fs.existsSync( directories.fixture ) ){
		_fixturesExist = true;
	}

	// Remove the raw and diff dirertory
	RemoveDir( directories.raw );
	RemoveDir( directories.diff );

	// Create the location directory if it doesn't exist
	Object.values( directories ).map( directory => {
		CreateDir( directory );
	});

	return _fixturesExist;
};


module.exports = Prepare;
