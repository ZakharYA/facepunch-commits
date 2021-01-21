/* eslint-disable */
const FacepunchCommits = require('./dist/index.js');

const commits = new FacepunchCommits(1000);

commits.latestCommit[''] = 0;

commits.subscribeToAll((commit) => {
	console.table({
		id: commit.id,
		repo: commit.repo,
		branch: commit.branch,
		author: commit.user.name,
		message: commit.message,
		created: commit.created,
		createdUnix: commit.toUnixTime(),
		isHide: commit.isHide()
	});
});
