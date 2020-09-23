const _FACEPUNCHAPI = require('./src/index');

const facepunchAPI = new _FACEPUNCHAPI(60000); // interval check commits in ms

facepunchAPI.subscribeToAuthor('Garry Newman', (commit) => {
	// Here we subscribe to commits from author Garry Newman
	console.log(commit);
	/*
		output =>
			{
				"id": 372462,
				"repo": "Web",
				"branch": "master",
				"changeset": "763694",
				"created": "2020-09-21T06:21:48",
				"message": "~ hide sandbox.source2",
				"user": {
				  "name": "Garry Newman",
				  "avatar": "https://files.facepunch.com/s/43d4ef6a46eb.jpg"
				}
			}
	 */
});

facepunchAPI.subscribeToRepository('sandbox.source', (commit) => {
	// Here we subscribe to the comments on the repository sandbox.source
	console.log(commit);
	/*
		output =>
			{
				"id": 371828,
				"repo": "sandbox.source",
				"branch": "master",
				"changeset": "dcf5b0",
				"created": "2020-09-02T13:45:19",
				"message": "Realm cleanup\n[UnmanagedCallersOnly]",
				"user": {
				  "name": "Garry Newman",
				  "avatar": "https://files.facepunch.com/s/43d4ef6a46eb.jpg"
				}
			}
	 */
});

facepunchAPI.subscribeToAuthorRepository('Garry Newman', 'Fad', (commit) => {
	console.log(commit);
	/*
		output =>
			{
				"id": 372486,
				"repo": "Fad",
				"branch": "master",
				"changeset": "d0c405",
				"created": "2020-09-21T14:17:17",
				"message": "Added Fad.Text.SDC\nSFML test uses SDC text test",
				"user": {
				  "name": "Garry Newman",
				  "avatar": "https://files.facepunch.com/s/43d4ef6a46eb.jpg"
				}
			 }
	 */
});

facepunchAPI.subscribeToAll((commit) => {
	console.log(commit);
	/*
		output =>
		{
			"id": 372608,
			"repo": "garrysmod",
			"branch": "master",
			"changeset": "83a39d",
			"created": "2020-09-23T16:32:21",
			"message": "TTT: Minor changes to portuguese.lua (#1725)",
			"user": {
			  "name": "Tiagoquix",
			  "avatar": ""
			}
    	}
	 */
});


