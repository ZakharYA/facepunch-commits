import FacepunchCommits from '../src/index';

const commits = new FacepunchCommits({
	interval: 1000
});

const nullifyCommit = (commit: string): void => {
	commits.latestCommit[commit] = 0;
};

describe('check subscribe', () => {
	it('subscribes to the all commit and waits for the commit', (done) => {
		nullifyCommit('');
		let called = false;

		commits.subscribeToAll(() => {
			if (called) return;
			called = true;

			done();
		});

		commits.catchRequest((err) => done(err));
	});

	it('check subscribe to repository', (done) => {
		const repositoryTest = 'sbox';

		nullifyCommit(`r/${repositoryTest}`);

		let called = false;

		commits.subscribeToRepository(repositoryTest, (commit) => {
			if (called) return;
			called = true;

			done(commit.repo === repositoryTest ? undefined : new Error('Repository is invalid'));
		});

		commits.catchRequest((err) => done(err));
	});

	it('check subscribe to author', (done) => {
		const authorTest = 'Garry Newman';

		nullifyCommit(authorTest.replace(/\s/g, ''));

		let called = false;

		commits.subscribeToAuthor(authorTest, (commit) => {
			if (called) return;
			called = true;

			done(commit.user.name === authorTest ? undefined : new Error('Author is not valid.')
			);
		});

		commits.catchRequest((err) => done(err));
	});

	it('check subscribe to author repository', (done) => {
		const authorName = 'Garry Newman';
		const authorRepository = 'sbox';

		nullifyCommit(`${authorName.replace(/\s/g, '')}/${authorRepository}`);

		let called = false;

		commits.subscribeToAuthorRepository(authorName, authorRepository, (commit) => {
			if (called) return;
			called = true;

			done(commit.user.name === authorName && commit.repo === authorRepository ?
				undefined:
				new Error('Author/Repository is not valid.')
			);
		});

		commits.catchRequest((err) => done(err));
	});

	it('check get commit id', (done) => {
		const commitId = 387280;
		commits.getCommitById(commitId)
			.then((commit) => done(commit.id === commitId ? undefined : new Error('commit id invalid')))
			.catch((err) => done(err));

		commits.catchRequest((err) => done(err));
	});
});
