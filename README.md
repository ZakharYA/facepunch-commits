<div style="text-align: center;"><img src="https://commits.facepunch.com/logo.svg" alt="facepunch logo"></div>
This library allows you to subscribe to commits from [commits](https://commits.facepunch.com)

## Documentation

### NPM
```
npm i facepunch-commits
```

## Functions
```js
subscribeToAuthor(name, callback)
```
* **Key:** `name`
	* **Type:** String.
	* **Description:** Name of the author to subscribe to.
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

```js
subscribeToRepository(name, callback)
```
* **Key:** `name`
	* **Type:** String.
	* **Description:** Name of the repository to subscribe to.
* **Key:** `callback`
	* **Type:** Function.
	* **Description:** The function that will be called with the new commit.

```js
subscribeToAuthorRepository(authorName, repositoryName, callback)
```
* **Key:** `authorName`
	* **Type:** String.
	* **Description:** Name of the author to subscribe to.
* **Key:** `repositoryName`
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

```js
catchRequest(callback)
```
* **Key:** `callback`
	* **Type:** Function.
    * **Description:** Called when a request has occurred. Return error


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

### Callback also has additional features
```js
isHide()
```
* **Type:** Function.
	* **Description:** Checks whether the switch is hidden. (blues with symbols)
	* **Return:** boolean

```js
toUnixTime()
```
* **Type:** Function.
	* **Description:** Convects date in unixtime
	* **Return:** number

## Example usage
```js
const FacepunchCommits = require('facepunch-commits');

const commits = new FacepunchCommits(15000); // interval check commits in ms

commits.subscribeToAuthor('Garry Newman', (commit) => {
	// Here we subscribe to commits from author Garry Newman
	console.log('Ohh... New commit from Garry!!!', commit);
})

commits.subscribeToRepository('sbox', (commit) => {
	// Here we subscribe to the comments on the repository sandbox.source
	console.log(commit.isHide() ? 'Ohh, is hide. fuck....' : commit.message);
})

commits.subscribeToAuthorRepository('Garry Newman', 'Fad', (commit) => {
	console.log('fad?? New commit from Garry in rep Fad', commit);
})

commits.subscribeToAll((commit) => {
	console.log(`new commit from ${commit.user.name}:`, commit);
})

commits.catchRequest((err) => {
	console.log('new error', err);
})
```
<a href="https://www.npmjs.com/package/facepunch-commits"><img src="https://img.shields.io/npm/v/facepunch-commits.svg?style=flat-square" alt="NPM version"></a>
<a href="https://vk.com/ghost1337gg"><img src="https://brand.vkforms.ru/static/media/logo_color_154.08f6e176.svg" height=20></a>
