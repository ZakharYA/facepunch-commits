// import fetch from 'node-fetch';
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
	}

	/**
	 * sendRequest
	 * * send request from api facepunch and get commits
	 * @param {String} type name repository to get
	 * 0 - repository
	 * 1 - author
	 * 2 — comments from a specific author in the repository
	 * @param {Object|String} name
	 * @returns return object commits
	 */
	async sendRequest(type, name) {
		let urlType = '';
		switch(type) {
			case 0:
				urlType = `${type}/${name}`;
				break;
			case 1:
				urlType = `${name}`;
				break;
			case 2:
				var author = name.author.replace(/\s/g, '');
				urlType = `${author}/${name.repository}`;
				break;
		}


		const request = await fetch(`${this.options.api}${urlType}?format=json`);
		const result = await request.json();

		return result.results;
	}

	/**
	 * subscribe
	 * * subscribe event from repository, call callback function
	 * @param {Number} type name repository to get
	 * 0 - repository
	 * 1 - author
	 * 2 — comments from a specific author in the repository
	 * @param {Object|String} name what to subscribe to
	 * @param {Function} callback how to return commit function
	 */
	async subscribe(type, name, callback) {
		const request = await this.sendRequest(type, name);
		if (typeof name === 'object') {
			if (!this.latest['author-repository']) this.latest['author-repository'] = {};
			if (!this.latest['author-repository'][name.author]) this.latest['author-repository'][name.author] = {};
			this.latest['author-repository'][name.author][name.repository] = request[0].id - 5000;
		} else {
			if (!this.latest['name']) this.latest['name'] = {};
			this.latest['name'][name] = request[0].id - 5000;
		}

		setInterval(async () => {
			const request = await this.sendRequest(type, name);
			const reversed = request.reverse();
			reversed.map((e) => {
				if (typeof name === 'object') {
					if (e.id <= this.latest['author-repository'][name.author][name.repository]) return;
				} else {
					if (e.id <= this.latest['name'][name]) return;
				}

				callback(e);
			})
			if (typeof name === 'object') {
				this.latest['author-repository'][name.author][name.repository] = request[0].id;
			} else {
				this.latest['name'][name] = request[0].id;
			}

		}, this.interval);
	}

	/**
	 * subscribeToAuthorRepository
	 * @param {String} author author to subscribe
	 * @param {String} repository repository to subscribe
	 * @param {Function} callback how to return new commit
	 */
	async subscribeToAuthorRepository(author, repository, callback) {
		this.subscribe(2, {
			author,
			repository
		}, callback);
	}

	/**
	 * subscribeToAuthor
	 * @param {String} author author to subscribe
	 * @param {Function} callback how to return new commit
	 */
	async subscribeToAuthor(author, callback) {
		this.subscribe(1, author, callback);
	}

	/**
	 * subscribeToRepository
	 * @param {String} author repository to subscribe
	 * @param {Function} callback how to return new commit
	 */
	async subscribeToRepository(repository, callback) {
		this.subscribe(0, repository, callback);
	}
}

// (() => {
// 	const facepunchAPI = new _FACEPUNCHAPI(60000);
// 	facepunchAPI.subscribeToAuthorRepository('Ryleigh Kostash', 'SpaceUsurperUnity', (commit) => {
// 		console.log(commit);
// 	})
// 	facepunchAPI.subscribeToRepository('SpaceUsurperUnity', (commit) => {
// 		console.log(commit);
// 	})
// 	facepunchAPI.subscribeToAuthor('Ryleigh Kostash', (commit) => {
// 		console.log(commit);
// 	})
// })();

// export default _FACEPUNCHAPI;

module.exports = _FACEPUNCHAPI;
