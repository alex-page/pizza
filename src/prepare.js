/*
 *
 * prepare.js - Interact with the file system
 *
 * Prepare    - Create all the necessary directories
 * RemoveDir  - Removing folders and all it’s sub folders
 * CopyFiles  - Copy a folder
 *
 */


//----------------------------------------------------------------------------------------------------------------------
// Dependencies
//----------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );


//----------------------------------------------------------------------------------------------------------------------
// Local
//----------------------------------------------------------------------------------------------------------------------
const { CreateDir } = require( './files' );
const { RemoveDir } = require( './files' );

/**
 * Prepare - Set up all of the directories
 *
 * @param  {object} directories - The directories to create and delete
 */
const Prepare = ( directories ) => {
	Log.verbose( '🍥  Spinning the dough     - Creating directories' );

	// Remove the raw and diff dirertory
	RemoveDir( directories.raw );
	RemoveDir( directories.diff );

	// Create the location directory if it doesn't exist
	Object.values( directories ).map( directory => CreateDir( directory ) );
};


module.exports = Prepare;
