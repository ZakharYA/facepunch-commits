import { Commit } from '../structures/Commit';

export interface FOptions {
	/**
	 * how often new commits will be checked
	 * default 1 min
	 * */
	interval: number,
	/**
	 * how many times will the request be in case of an err
	 * default 5 min
	 * */
	intervalError: number
}

export type CallbackCommit = (commit: Commit) => void;
export type CallbackError = (err: Error) => void;
