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
			.then((commit) => done(new Date(commit.toUnixTime).toString() !== 'Invalid Date' ?
				undefined:
				new Error('unixtime invalid')));

		commits.catchRequest((err) => done(err));
	});
});
