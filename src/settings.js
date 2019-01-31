/*
 *
 * Settings used throughout the application
 *
 * SETTINGS - Keeping our settings across multiple imports
 *
 */


'use strict';


// ---------------------------------------------------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------------------------------------------------
const Log = require( 'indent-log' );


/**
 * Keeping our settings across multiple imports
 *
 * @type {Object}
 */
const SETTINGS = {
	defaults: {
		pizza: {
			urls:   'http://designsystem.gov.au/',
			widths: [ 1200, 320 ],

			directories: {
				raw:     './__tests__/pizza/raw/',
				fixture: './__tests__/pizza/fixture/',
				diff:    './__tests__/pizza/diff/',
			},
		},
		visualDiff: {
			output: {
				errorColor: {
					red:   255,
					green: 0,
					blue:  255,
				},
				errorType:           'movement',
				transparency:        1,
				largeImageThreshold: 1200,
				useCrossOrigin:      false,
				outputDiff:          true,
			},
			scaleToSameSize: true,
			ignore:          [ 'nothing', 'less', 'antialiasing', 'colors', 'alpha' ],
		},
		logs: {
			banner:  ' 🍕 🍕 🍕   ',
			error:   ' 🍕   🔥  ERROR: ',
			info:    ' 🍕   🔔  INFO: ',
			ok:      ' 🍕   👍  ',
			done:    ' 🍕   🚀  DONE: ',
			time:    ` 🍕   🕐  [${ Log.Style.bold( '#timestamp#' ) }]`,
			verbose: ' 🍕   😬  VERBOSE: ',
		},
	},


	/**
	 * Getting our settings
	 *
	 * @returns {object} - The settings object
	 */
	get: () => SETTINGS.defaults,


	/**
	 * Merge with default settings
	 *
	 * @param   {object} newSettings - The new settings object to be merged
	 * @returns {object}             - Our new settings
	 */
	set: ( newSettings ) => {
		Log.verbose( 'Applying new settings' );

		if( newSettings ) {
			SETTINGS.default = newSettings;
			return SETTINGS.default;
		}

		return SETTINGS.get();
	},
};


module.exports = SETTINGS;
