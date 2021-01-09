/* eslint-disable */
const FacepunchCommits = require('./dist/index.js');

const commits = new FacepunchCommits(1000);

commits.latestCommit[''] = 0;

commits.subscribeToAll((commit) => {
	console.log(commit);
})
