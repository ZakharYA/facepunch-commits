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
