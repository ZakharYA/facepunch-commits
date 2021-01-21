/*!
 * facepunch-commits
 * Copyright(c) 2021 Zakhar
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { ICommit } from './CommitsResponse';

export interface customFunctions {
	/**
	 * Whether the commit is hidden
	 */
	isHide?: (this: ICommit) => boolean;
	/**
	 * Convects date in unixtime
	 */
	toUnixTime?: (this: ICommit) => number;
}
