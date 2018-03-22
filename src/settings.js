/***************************************************************************************************************************************************************
 *
 * Settings used throughout the application
 *
 * SETTINGS - Keeping our settings across multiple imports
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log    = require( 'lognana' );
const CFonts = require( 'cfonts' );
const Path   = require( 'path' );



/**
 * Keeping our settings across multiple imports
 *
 * @type {Object}
 */
const SETTINGS = {
	/**
	 * The default settings
	 *
	 * @type {Object}
	 */
	defaults: {
		pizza: {
			urls: [ 'http://alexpage.com.au', 'https://github.com/alex-page' ],
			widths: [ 1200, 320 ],
			directory: 'pizza'
		},

		type: {
			title: CFonts.render( 'Pizza', {
				align: 'center',
				colors: [ 'yellow', 'red' ]
			}).string,
			subtitle:  CFonts.render( '- Visual regression testing that is tasty and cheesy -', {
				font: 'console',
				align: 'center',
				colors: [ 'yellow' ]
			}).string,

		}
	},


	/**
	 * Getting our settings
	 *
	 * @returns {object} - The settings object
	 */
	get: () => {
		return SETTINGS.defaults;
	},


	/**
	 * Merge with default settings
	 *
	 * @param   {object} newSettings - The new settings object to be merged
	 *
	 * @returns {object}             - Our new settings
	 */
	set: ( newSettings ) => {
		Log.verbose(`Setting new settings`);

		if( newSettings ) {

			SETTINGS.default = newSettings;
			return SETTINGS.default;
		}
		else {
			return SETTINGS.get();
		}
	},
};


module.exports = SETTINGS;
