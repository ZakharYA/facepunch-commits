// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FacepunchCommits = require('../dist/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires

describe('check library commits', () => {
	it('subscribes to the commit and waits for the commit', (done) => {
		const commits = new FacepunchCommits(1000);

		commits.latestCommit[''] = 0;
		let called = false;

		commits.subscribeToAll((commit) => {
			if (called) return;
			called = true;

			try {
				assert(typeof (commit.id) === 'number');
				assert(typeof (commit.repo) === 'string');
				assert(typeof (commit.branch) === 'string');
				assert(typeof (commit.changeset) === 'string');
				assert(typeof (commit.created) === 'string');
				assert(typeof (commit.message) === 'string');
				assert(typeof (commit.user) === 'object');
				assert(typeof (commit.user.name) === 'string');
				assert(typeof (commit.user.avatar) === 'string');

				done();
			} catch (e) {
				done(e);
			}
		});
	});
});
