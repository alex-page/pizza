/***************************************************************************************************************************************************************
 *
 * files.js - Interact with the file system
 *
 * CreateDir  - Create a path if it doesn’t exist
 * RemoveDir  - Removing folders and all it’s sub folders
 * CopyFiles  - Copy a folder
 *
 **************************************************************************************************************************************************************/


'use strict';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const Fs      = require( 'fs' );
const Path    = require( 'path' );
const FsExtra = require( 'fs-extra' );
const Del     = require( 'del' );
const Log     = require( 'lognana' );



/**
 * Create a path if it doesn’t exist
 *
 * @param  {string} dir - The path to be checked and created if not found
 *
 * @return {string}     - The path that was just worked at
 */
const CreateDir = ( dir ) => {
	Log.verbose( `Check exists:   "${ dir }"` );

	const splitPath = dir.split( '/' );

	splitPath.reduce( ( path, subPath ) => {
		let currentPath;

		if( /^win/.test( process.platform ) && path === '' ) { // when using windows (post truth) at beginning of the path
			path = './';                                         // we add the prefix to make sure it works on windows (yuck)
		}

		if( subPath != '.' ) {
			currentPath = Path.normalize(`${ path }/${ subPath }`);

			// Log.verbose( `Checking if ${ currentPath } exists` );
			if( !Fs.existsSync( currentPath ) ) {
				try {
					Fs.mkdirSync( currentPath );

					Log.verbose( `Created:        "${ currentPath }"` )
				}
				catch( error ) {
					Log.error( `Error when creating the folder ${ currentPath  } for path ${ dir }` );
					Log.error( error );

					process.exit( 1 );
				}
			}
		}
		else {
			currentPath = subPath;
		}

		return currentPath;
	}, '');

	return splitPath.join('/');
};


/**
 * Removing folders and all it’s sub folders
 *
 * @param  {array} dir      - An array of all folders to be removed
 */
const RemoveDir = ( dir ) => {
	try {
		Del.sync( dir );
		Log.verbose( `Removed folder: ${ JSON.stringify( dir ) } ` )
	}
	catch( error ) {
		Log.error( error );
	}
}


module.exports = {
	RemoveDir: RemoveDir,
	CreateDir: CreateDir
}
