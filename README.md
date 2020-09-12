<div style="text-align: center;"><img src="https://commits.facepunch.com/logo.svg"></div>
This library allows you to subscribe to commits from [commits](https://commits.facepunch.com)

## Documentation

### NPM
```
npm i facepunch-api
```

## Functions
```js
subscribeToAuthor(author, callback)
```
* **Key:** `author`
	* **Type:** String.
	* **Description:** Name of the author to subscribe to.
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

```js
subscribeToRepository(repository, callback)
```
* **Key:** `repository`
	* **Type:** String.
	* **Description:** Name of the repository to subscribe to.
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

```js
subscribeToAuthorRepository(author, repository, callback)
```
* **Key:** `author`
	* **Type:** String.
	* **Description:** Name of the author to subscribe to.
* **Key:** `repository`
	* **Type:** String.
	* **Description:** Name of the repository to subscribe to.
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

```js
subscribeToAll(callback)
```
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

# Example return in callback function
```json
{
      "id": 372193,
      "repo": "rust_reboot",
      "branch": "main/ai_test_changes/events",
      "changeset": "54530",
      "created": "2020-09-12T10:44:02",
      "message": "wip AI state events & listener.",
      "user": {
        "name": "Adam Woolridge",
        "avatar": "https://files.facepunch.com/s/b8ec968c721a.jpg"
      }
}
```

## Example usage
```js
const _FACEPUNCHAPI = require('facepunch-api');

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

facepunchAPI.subscribeToAll((commit) => {
	console.log(`new commit from ${commit.author.name}:`, commit);
})
```
<a href="https://www.npmjs.com/package/facepunch-api"><img src="https://img.shields.io/npm/v/facepunch-api.svg?style=flat-square" alt="NPM version"></a>
<a href="https://vk.com/ghost1337gg"><img src="https://brand.vkforms.ru/static/media/logo_color_154.08f6e176.svg" height=20></a>
