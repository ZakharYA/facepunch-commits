import FacepunchCommits from '../src/index';

const commits = new FacepunchCommits({
	interval: 1000
});

const commitId = 387280;

describe('check method class in commit', () => {
	it('check working is hide', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(commit.isHide ? undefined : new Error('commit is not hide')));

		commits.catchRequest((err) => done(err));
	});

	it('check working to unixtime', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(commit.toUnixTime === 1626385501 ? undefined : new Error('unixtime invalid')));

		commits.catchRequest((err) => done(err));
	});

	it('check get link commit', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(
				commit.urlCommit === `https://commits.facepunch.com/${commitId}` ?
					undefined :
					new Error('invalid url')
			));

		commits.catchRequest((err) => done(err));
	});

	it('check username', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(commit.username === `Jarryd Campi` ? undefined : new Error('invalid username')));

		commits.catchRequest((err) => done(err));
	});

	it ('check get avatar', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(commit.avatar === `https://files.facepunch.com/s/d6ae6ff5cf70.jpg` ?
				undefined :
				new Error('invalid avatar')));

		commits.catchRequest((err) => done(err));
	});
});
