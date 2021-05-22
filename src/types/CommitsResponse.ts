/*!
 * facepunch-commits
 * Copyright(c) 2021 Zakhar
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { CustomFunctions } from './customFunctions';

export interface ICommit extends CustomFunctions {
	/**
	 * unique id commit
	 */
	id: number;
	/**
	 * name repository
	 */
	repo: string;
	/**
	 * name branch
	 */
	branch: string;
	/**
	 * changeset id
	 */
	changeset: string;
	/**
	 * date created fixation commit
	 */
	created: string;
	/**
	 * commit message
	 */
	message: string;
	/**
	 * user info commit
	 */
	user: {
		/**
		 * name author commit
		 */
		name: string;
		/**
		 * avatar author commit
		 */
		avatar: string
	};
}

export default interface CommitsResponse {
	total: number;
	skip: number;
	take: number;
	results: ICommit[];
}
