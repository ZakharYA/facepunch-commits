const fetch = require('node-fetch');

class _FACEPUNCHAPI {
	/**
	 * constructor
	 * @param {Number} interval interval from request to api
	 */
	constructor(interval) {
		this.latest = {};
		this.interval = interval;

		this.options = {
			api: 'https://commits.facepunch.com/'
		}

		this.errorFunction = undefined;
	}

	/**
	 * sendRequest
	 * * send request from api facepunch and get commits
	 * @param {Number} type name repository to get
	 * 0 - repository
	 * 1 - author
	 * 2 — comments from a specific author in the repository
	 * 3 — subscribe to all
	 * @param {Object|String} name
	 * @return {Object}
	 */
	async sendRequest(type, name) {
		let urlType = '';
		let author;

		switch (type) {
			case 0:
				urlType = `r/${name}`;
				break;
			case 1:
				urlType = `${name}`;
				break;
			case 2:
				author = name['author'].replace(/\s/g, '');
				urlType = `${author}/${name['repository']}`;
				break;
			case 3:
				break;
		}


		const request = await fetch(`${this.options.api}${urlType}?format=json`);

		try {
			let data = await request.json()
			return data.results;
		} catch {
			if (this.errorFunction !== undefined) this.errorFunction(request);

			return {'error': true};
		}
	}

	/**
	 * subscribe
	 * * subscribe event from repository, call callback function
	 * @param {Number} type name repository to get
	 * 0 - repository
	 * 1 - author
	 * 2 — comments from a specific author in the repository
	 * 3 — subscribe to all
	 * @param {Object|String} name what to subscribe to
	 * @param {Function} callback how to return commit function
	 * @return {void}
	 */
	async subscribe(type, name, callback) {
		const request = await this.sendRequest(type, name);

		if (typeof name === 'object' && name !== null) {
			if (!this.latest['author-repository']) this.latest['author-repository'] = {};
			if (!this.latest['author-repository'][name.author]) this.latest['author-repository'][name.author] = {};
			this.latest['author-repository'][name.author][name.repository] = request[0].id;
		} else {
			if (!this.latest['name']) this.latest['name'] = {};
			this.latest['name'][name] = request[0].id;
		}

		setInterval(async () => {
			const request = await this.sendRequest(type, name);

			let found = false;
			const data = [];

			request.map((e) => {
				if (typeof name === 'object' && name !== null) {
					if (e.id === this.latest['author-repository'][name.author][name.repository]) found = true;
				} else {
					if (e.id === this.latest['name'][name]) found = true;
				}

				if (found) return;

				data.push(e);
			})

			data.reverse();
			data.map((e) => callback(e));

			if (typeof name === 'object' && name !== null) {
				this.latest['author-repository'][name.author][name.repository] = request[0].id;
			} else {
				this.latest['name'][name] = request[0].id;
			}

		}, this.interval);
	}

	/**
	 * subscribeToAuthorRepository
	 * * Subscribes to the commits of a specific author and repository
	 * * example: https://commits.facepunch.com/billford/rust_reboot
	 * @param {String} author author to subscribe
	 * @param {String} repository repository to subscribe
	 * @param {Function} callback how to return new commit
	 * @return {void}
	 */
	subscribeToAuthorRepository(author, repository, callback) {
		this.subscribe(2, {
			author,
			repository
		}, callback);
	}

	/**
	 * subscribeToAuthor
	 * * Subscribes to the communes of a specific author
	 * @param {String} author author to subscribe
	 * @param {Function} callback how to return new commit
	 * @return {void}
	 */
	subscribeToAuthor(author, callback) {
		this.subscribe(1, author, callback);
	}

	/**
	 * subscribeToRepository
	 * * Subscribes to the commits of a specific repository
	 * @param {String} repository repository to subscribe
	 * @param {Function} callback how to return new commit
	 * @return {void}
	 */
	subscribeToRepository(repository, callback) {
		this.subscribe(0, repository, callback);
	}

	/**
	 * subscribeToAll
	 * * Subscribe to all commits
	 * @param {Function} callback how to return new commit
	 * @return {void}
	 */
	subscribeToAll(callback) {
		this.subscribe(3, null, callback);
	}

	/**
	 * throwError
	 * * Your callback function will be called if the fetch query fails
	 * @param callback
	 * @return {void}
	 */
	throwError(callback) {
		this.errorFunction = callback;
	}
}

module.exports = _FACEPUNCHAPI;
