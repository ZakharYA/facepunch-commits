// import fetch from 'node-fetch';
const fetch = require('node-fetch');

class _FACEPUNCHAPI {
	/**
	 * constructor
	 * @param {Number} interval interval from request to api
	 */
	constructor(interval) {
		this.latestCommit = {};
		this.interval = interval;

		this.options = {
			api: 'https://commits.facepunch.com/r/'
		}
	}

	/**
	 * sendRequest
	 * * send request from api facepunch and get commits
	 * @param {String} repository name repository to get
	 * @returns return object commits
	 */
	async sendRequest(repository) {

		const request = await fetch(`${this.options.api}${repository}?format=json`);
		const result = await request.json();

		return result.results;
	}

	/**
	 * subscribe
	 * * subscribe event from repository, call callback function
	 * @param {String} repository name repository to get
	 * @param {Function} callback how to return commit function
	 */
	async subscribe(repository, callback) {
		const request = await this.sendRequest(repository);
		this.latestCommit[repository] = request[0].id;

		setInterval(async () => {
			const request = await this.sendRequest(repository);
			request.map((e) => {
				if (e.id <= this.latestCommit[repository]) return;
				callback(e);
			})

			this.latestCommit[repository] = request[0].id;

		}, this.interval);
	}
}

// example, kek :/
// (() => {
// 	const facepunchAPI = new _FACEPUNCHAPI(5000);

// 	facepunchAPI.subscribe('SpaceUsurperUnity', (commit) => {
// 		console.log('Hello Garry! New commit from SpaceUsurperUnity:', commit);
// 	});

// 	facepunchAPI.subscribe('Garrys Mod', (commit) => {
// 		console.log('Hello Garry! New commit from Garrys Mod:', commit);
// 	});

// })();

// export default _FACEPUNCHAPI;

module.exports = _FACEPUNCHAPI;
