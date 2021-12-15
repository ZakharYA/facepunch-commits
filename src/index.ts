import CommitsResponseValidator from './types/CommitsResponse.validator';
import { ICommit } from './types/CommitsResponse';
import { Commit } from './structures/Commit';
import { CallbackCommit, CallbackError, FOptions } from './types/type';
import { request } from 'undici';

class FacepunchCommits {
	public options: FOptions & { url: string };
	public latestCommit: {
		[key: string]: number;
	};

	private errorHandler?: ((error: Error) => void);

	private hasError: boolean;

	/**
	 * @param {Partial<FOptions>} options - set params chcek commits
	 */
	constructor(options?: Partial<FOptions>) {
		const defaultOptions: FOptions & { url: string } = {
			interval: 6e4,
			intervalError: 5 * 6e4,
			url: 'https://commits.facepunch.com/',
		};

		this.options = { ...defaultOptions, ...options };

		this.latestCommit = {};
		this.errorHandler = undefined;
		this.hasError = false;
	}

	private sendRequest(params: string): Promise<ICommit[]> {
		return request(`${this.options.url}${params}?format=json`)
			.then(async (response) => {
				if (response.statusCode !== 200) throw await response.body.text();

				return response.body.json();
			})
			.then((result) => {
				if (!('results' in result)) throw new Error(result);

				CommitsResponseValidator(result);

				return result.results;
			})
			.catch((err) => {
				setTimeout(() => {
					this.hasError = false;
				}, this.options.intervalError);

				if (!this.hasError) {
					this.hasError = true;

					if (this.errorHandler) {
						this.errorHandler(err);
					} else {
						throw err;
					}
				}
			});
	}

	private subscribe(params: string, callback: CallbackCommit): void {
		const sendRequest = () => {
			this.sendRequest(params)
				.then((result) => {
					if (!(result && result.length > 0)) return;

					const startCommit = (result[0] as ICommit);

					if (!(params in this.latestCommit)) {
						this.latestCommit[params] = startCommit.id;
						return;
					}

					if (startCommit.id === this.latestCommit[params]) return;

					const data: Commit[] = [];

					for (const commit of result) {
						if (commit.id === this.latestCommit[params]) break;

						data.push(new Commit(commit));
					}

					this.latestCommit[params] = startCommit.id;

					data.reverse();
					data.map((e) => callback(e));
				});
		};

		setInterval(() => {
			if (this.hasError) return;

			setTimeout(sendRequest, 1000);
		}, this.options.interval);
	}

	/**
	 * get commit from id
	 * @param {number} id - id commit
	 */
	public getCommitById = async (id: number): Promise<Commit> => {
		const commits = await this.sendRequest(`${id}`);
		if (!commits[0]) throw new Error('commit not found.');
		return new Commit(commits[0]);
	};

	/**
	 * Subscribes to the commits of a specific repository
	 * @param {string} name repository to subscribe
	 * @param {CallbackCommit} callback callback how to return new commit
	 */
	public subscribeToRepository(name: string, callback: CallbackCommit): void {
		this.subscribe(`r/${name}`, callback);
	}

	/**
	 * Subscribes to the communes of a specific author
	 * @param {string} authorName author to subscribe
	 * @param {CallbackCommit} callback how to return new commit
	 */
	public subscribeToAuthor(authorName: string, callback: CallbackCommit): void {
		const authorNameReplaced = authorName.replace(/\s/g, '');
		this.subscribe(authorNameReplaced, callback);
	}

	/**
	 * Subscribes to the commits of a specific author and repository
	 * example:
	 * authorName = billford
	 * repositoryName = rust_reboot
	 * https://commits.facepunch.com/billford/rust_reboot
	 * @param {string} authorName author to subscribe
	 * @param {string} repositoryName repository to subscribe
	 * @param {CallbackCommit} callback how to return new commit
	 */
	public subscribeToAuthorRepository(authorName: string, repositoryName: string, callback: CallbackCommit): void {
		const authorNameReplaced = authorName.replace(/\s/g, '');
		this.subscribe(`${authorNameReplaced}/${repositoryName}`, callback);
	}

	/**
	 * Subscribe to all commits
	 * @param {CallbackCommit} callback how to return new commit
	 */
	public subscribeToAll(callback: CallbackCommit): void {
		this.subscribe('', callback);
	}

	/**
	 * Calls callback function in case of error when receiving a commit
	 * @param {CallbackError} callback - A mistake will arrive here
	 */
	public catchRequest(callback: CallbackError): void {
		this.errorHandler = callback;
	}
}

export = FacepunchCommits;
