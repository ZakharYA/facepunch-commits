import fetch from 'node-fetch';
import CommitsValidate, { CommitsResponse } from './types/CommitsResponse.validator';
import { Commit } from './types/CommitsResponse';

class FacepunchCommits {
	options: {
		interval: number,
		intervalError: number,
		url: string
	};
	latestCommit: {
		[key: string]: number;
	}
	errorHandler: ((error: any) => void) | undefined;
	hasError: boolean

	/**
	 * @param interval - how often new commits will be checked(milliseconds)
	 * @param intervalError - How many times will the request be in case of an error(milliseconds)(Default 5 min)
	 */
	constructor(interval : number, intervalError?: number) {
		this.options = {
			interval,
			intervalError: intervalError || 60000 * 5,
			url: 'https://commits.facepunch.com/',
		};

		this.latestCommit = {};
		this.errorHandler = undefined;
		this.hasError = false;
	}

	/**
	 * @param params - Advanced Options in url
	 */
	async sendRequest(params: string) : Promise<CommitsResponse['results']> {
		return fetch(`${this.options.url}${params}?format=json`)
			.then((response) => {
				if (!response.ok) throw response.text();
				return response.json();
			})
			.then((result) => {
				if (!('results' in result)) throw result;

				CommitsValidate(result); // throw called

				return result.results;
			})
			.catch((err: Error) => {
				throw err;
			})
	}

	/**
	 * Subscribes to the url and calls callback function
	 * @param params - Advanced Options in url
	 * @param callback - return commit
	 */
	subscribe(params: string, callback: (arg0: Commit) => void) : void {
		setInterval(() => {
			if (this.hasError) return;

			this.sendRequest(params)
				.then((result) => {
					if (!(params in this.latestCommit)) {
						this.latestCommit[params] = result[0].id;
						return;
					}

					if (result[0].id === this.latestCommit[params]) return;

					const data: Commit[] = [];

					for (let i = 0; i < result.length; i++) {
						if (result[i].id === this.latestCommit[params]) break;

						data.push(result[i]);
					}

					this.latestCommit[params] = result[0].id;

					data.reverse();
					data.map((e) => callback(e));
				})
				.catch((err) => {
					setTimeout(() => {
						this.hasError = false;
					}, this.options.intervalError);
					this.hasError = true;

					if (this.errorHandler) return this.errorHandler(err);
					throw err;
				})
		}, this.options.interval);
	}

	/**
	 * Subscribes to the commits of a specific repository
	 * @param name repository to subscribe
	 * @param callback callback how to return new commit
	 */
	subscribeToRepository(name: string, callback: (arg0: Commit) => void) : void {
		this.subscribe(`r/${name}`, callback);
	}

	/**
	 * Subscribes to the communes of a specific author
	 * @param authorName author to subscribe
	 * @param  callback how to return new commit
	 */
	subscribeToAuthor(authorName: string, callback: (arg0: Commit) => void) : void {
		this.subscribe(authorName, callback);
	}

	/**
	 * Subscribes to the commits of a specific author and repository
	 * example: https://commits.facepunch.com/billford/rust_reboot
	 * @param authorName author to subscribe
	 * @param repositoryName repository to subscribe
	 * @param callback how to return new commit
	 */
	subscribeToAuthorRepository(authorName: string, repositoryName: string, callback: (arg0: Commit) => void) : void {
		authorName = authorName.replace(/\s/g, '');
		this.subscribe(`${authorName}/${repositoryName}`, callback);
	}

	/**
	 * Subscribe to all commits
	 * @param callback how to return new commit
	 */
	subscribeToAll(callback: (arg0: Commit) => void) : void {
		this.subscribe('', callback);
	}

	catchRequest(callback: (error: any) => void) : void {
		this.errorHandler = callback;
	}
}

export = FacepunchCommits;
