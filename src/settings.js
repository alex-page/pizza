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
const Log    = require( 'indent-log' );
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
			urls: [ 'http://alexpage.com.au/' ],
			widths: [ 1200, 320 ],
			directories: {
				raw:      './__tests__/pizza/raw/',
				fixture:  './__tests__/pizza/fixture/',
				diff:     './__tests__/pizza/diff/',
			}
		},
		visualDiff: {
			output: {
				errorColor: {
					red: 255,
					green: 0,
					blue: 255
				},
				errorType: 'movement',
				transparency: 0.3,
				largeImageThreshold: 1200,
				useCrossOrigin: false,
				outputDiff: true
			},
			scaleToSameSize: true,
			ignore: [ 'nothing', 'less', 'antialiasing', 'colors', 'alpha' ],
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
