### NPM
```
npm i facepunch-api
```

## Example usage
```js
const _facepunchAPI = require('facepunch-api');
const facepunchAPI = new _facepunchAPI(5000);

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
```
<a href="https://www.npmjs.com/package/facepunch-api"><img src="https://img.shields.io/npm/v/facepunch-api.svg?style=flat-square" alt="NPM version"></a>
<a href="https://vk.com/ghost1337gg"><img src="https://brand.vkforms.ru/static/media/logo_color_154.08f6e176.svg" height=20></a>
