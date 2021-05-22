/*!
 * facepunch-commits
 * Copyright(c) 2021 Zakhar
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { ICommit } from './CommitsResponse';

export interface CustomFunctions {
	/**
	 * Whether the commit is hidden
	 */
	// eslint-disable-next-line no-unused-vars
	isHide?: (this: ICommit) => boolean;
	/**
	 * Convects date in unixtime
	 */
	// eslint-disable-next-line no-unused-vars
	toUnixTime?: (this: ICommit) => number;
}
