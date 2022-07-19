import FacepunchCommits from '../src/index';


const getClass = (): FacepunchCommits => {
	return new FacepunchCommits({
		interval: 1000
	});
};

const nullifyCommit = (fClass: FacepunchCommits, commit: string): void => {
	fClass.latestCommit[commit] = 0;
};

describe('check subscribe', () => {
	it('subscribes to the all commit and waits for the commit', (done) => {
		const commits = getClass();
		nullifyCommit(commits, '');
		let called = false;

		commits.subscribeToAll(() => {
			if (called) return;
			called = true;

			done();
		});

		commits.catchRequest((err) => done(err));
	});

	it('check subscribe to repository', (done) => {
		const commits = getClass();
		const repositoryTest = 'sbox';

		nullifyCommit(commits, `r/${repositoryTest}`);

		let called = false;

		commits.subscribeToRepository(repositoryTest, (commit) => {
			if (called) return;
			called = true;

			done(commit.repo === repositoryTest ? undefined : new Error('Repository is invalid'));
		});

		commits.catchRequest((err) => done(err));
	});

	it('check subscribe to author', (done) => {
		const commits = getClass();
		const authorTest = 'Garry Newman';

		nullifyCommit(commits, authorTest.replace(/\s/g, ''));

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
		const commits = getClass();
		const authorName = 'Garry Newman';
		const authorRepository = 'sbox';

		nullifyCommit(commits, `${authorName.replace(/\s/g, '')}/${authorRepository}`);

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
		const commits = getClass();
		const commitId = 387280;
		commits.getCommitById(commitId)
			.then((commit) => done(commit.id === commitId ? undefined : new Error('commit id invalid')))
			.catch((err) => done(err));

		commits.catchRequest((err) => done(err));
	});

	it('subscribes to the all commit and check passed auto likes', (done) => {
		const commits = getClass();
		nullifyCommit(commits, '');

		let called = false;
		commits.options.autoGetLikes = true;

		commits.subscribeToAll((commit) => {
			if (called) return;
			called = true;
			commits.options.autoGetLikes = false;

			done(typeof commit.likes === 'number' && typeof commit.dislikes === 'number' ?
				undefined:
				new Error('bad auto get likes in subscribe to all'));
		});

		commits.catchRequest((err) => {
			commits.options.autoGetLikes = false;
			done(err);
		});
	});
});
