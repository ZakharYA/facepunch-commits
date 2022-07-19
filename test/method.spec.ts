import FacepunchCommits from '../src/index';

const commits = new FacepunchCommits({
	interval: 1000
});

const commitId = 387280;

describe('check method class in commit', () => {
	it('check working is hide', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(commit.isHide() ? undefined : new Error('commit is not hide')))
			.catch((err) => done(err));

		commits.catchRequest((err) => done(err));
	});

	it('check working to unixtime', (done) => {
		commits.getCommitById(commitId)
			.then((commit) => done(new Date(commit.toUnixTime()).toString() !== 'Invalid Date' ?
				undefined:
				new Error('unixtime invalid')))
			.catch((err) => done(err));

		commits.catchRequest((err) => done(err));
	});

	it('check get likes commit', (done) => {
		commits.getCommitById(commitId)
			.then(async (commit) => {
				const likes = await commit.getLikes();
				if (typeof likes.likes === 'number' && typeof likes.dislikes === 'number') {
					done(undefined);
				} else {
					done(new Error('bad likes data'));
				}
			})
			.catch((err) => done(err));

		commits.catchRequest((err) => done(err));
	});
});
