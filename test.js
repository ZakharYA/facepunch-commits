const _FACEPUNCHAPI = require('./src/index');

const facepunchAPI = new _FACEPUNCHAPI(60000); // interval check commits in ms

facepunchAPI.subscribeToAuthor('Garry Newman', (commit) => {
	// Here we subscribe to commits from author Garry Newman
	console.log('Ohh... New commit from Garry!!!', commit);
})

facepunchAPI.subscribeToRepository('sandbox.source', (commit) => {
	// Here we subscribe to the comments on the repository sandbox.source
	console.log('O yes. S&Box released', commit);
})

facepunchAPI.subscribeToAuthorRepository('Garry Newman', 'Fad', (commit) => {
	console.log('fad?? New commit from Garry in rep Fad', commit);
})


