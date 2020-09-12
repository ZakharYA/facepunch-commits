### NPM
```
npm i facepunch-api
```

## Example
```js
const _facepunchAPI = require('facepunch-api');
const facepunchAPI = new _facepunchAPI(5000);

facepunchAPI.subscribe('SpaceUsurperUnity', (commit) => {
	console.log('Hello Garry! New commit from SpaceUsurperUnity:', commit);
});

facepunchAPI.subscribe('Garrys Mod', (commit) => {
	console.log('Hello Garry! New commit from Garrys Mod:', commit);
});
```
<a href="https://www.npmjs.com/package/facepunch-api"><img src="https://img.shields.io/npm/v/facepunch-api.svg?style=flat-square" alt="NPM version"></a>
<a href="https://vk.com/ghost1337gg"><img src="https://brand.vkforms.ru/static/media/logo_color_154.08f6e176.svg" height=20></a>
