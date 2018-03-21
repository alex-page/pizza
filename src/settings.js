/***************************************************************************************************************************************************************
 *
 * Settings used throughout the application
 *
 * SETTINGS - Keeping our settings across multiple imports
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Log = require( './helper' ).Log;


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
