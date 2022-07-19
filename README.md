<h1 align="center">Watch facepunch commits</h1>

<h2 align="center">
    <a href="https://commits.facepunch.com">
        <img width="134" src="https://commits.facepunch.com/logo.svg" alt="Facepunch logo">
    </a>
</h2>

This library allows you to track the commits from the [facepunch site](https://commits.facepunch.com).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node CI][github-actions-node-ci]][github-actions-node-ci-url]
[![NPM Publish][github-actions-npm-publish]][github-actions-npm-publish-url]

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```bash
$ npm i facepunch-commits
```

## Features

* Ability to subscribe to commits
* Set the interval after which the next request to view the commits will be executed
* Strict typing
* Additional methods that allow you to check whether the commit is hidden, as well as convect the date in unixtime

## Functions

```js
subscribeToAuthor(name, callback)
```
* **Description:** The function that will be called with the new commit.
* **Key:** `name`
    * **Type:** String.
    * **Description:** Name of the author to subscribe to.
* **Key:** `callback`
    * **Type:** Function.
	* **Return:** `Commit`

```js
subscribeToRepository(name, callback)
```
* **Description:** The function that will be called with the new commit.
* **Key:** `name`
    * **Type:** String.
    * **Description:** Name of the repository to subscribe to.
* **Key:** `callback`
    * **Type:** Function.
    * **Return:** `Commit`

```js
subscribeToAuthorRepository(authorName, repositoryName, callback)
```
* **Description:** The function that will be called with the new commit.
* **Key:** `authorName`
    * **Type:** String.
    * **Description:** Name of the author to subscribe to.
* **Key:** `repositoryName`
    * **Type:** String.
    * **Description:** Name of the repository to subscribe to.
* **Key:** `callback`
    * **Type:** Function.
    * **Return** `Commit`

```js
subscribeToAll(callback)
```
* **Description:** The function that will be called with the new commit.
* **Key:** `callback`
    * **Type:** Function.
	* **Return:** `Commit`

```js
catchRequest(callback)
```
* **Description:** Called when a request has occurred. Return error
* **Key:** `callback`
    * **Type:** Function.
	* **Return:** `Error`

```js
getCommitById(id)
```
* **Description:** Get commit by id.
* **Key:** `id`
	* **Type:** Function.
	* **Return:** Promise `Commit`.

## Callback also has additional features
```js
commit.getLikes()
```

* **Type:** Function.
    * **Description:** Get likes and dislikes in commit
    * **Return:** Object
    ```js
      {
      	likes: <Number>
      	dislikes: <Number>
      }
    ```
 
```js
commit.isHide()
```

* **Type:** Function.
    * **Description:** Checks whether the switch is hidden. (blues with symbols)
    * **Return:** boolean
	
```js
commit.toUnixTime()
```
* **Type:** Function.
	* **Description:** Convects date in unixtime
	* **Return:** number

```js
commit.likes
```
* **Type:** Number | Null
    * **Description:** count likes in commit (if you called function getLikes())

```js
commit.dislikes
```
* **Type:** Number | Null
	* **Description:** count dislikes in commit (if you called function getLikes())

```js
commit.urlCommit
```
* **Type:** Function.
	* **Description:** Get url link commit
	* **Return:** string

```js
commit.username
```
* **Type:** Function.
	* **Description:** Get username author commit
	* **Return:** string

```js
commit.avatar
```
* **Type:** Function.
	* **Description:** Get avatar author commit
	* **Return:** string

## Example return in callback function (commit)

```typescript
interface Commit {
	/**
	 * unique id commit
	 */
	id: number;
	/**
	 * name repository
	 */
	repo: string;
	/**
	 * name branch
	 */
	branch: string;
	/**
	 * changeset id
	 */
	changeset: string;
	/**
	 * date created fixation commit
	 */
	created: string;
	/**
	 * commit message
	 */
	message: string;
	/**
	 * user info commit
	 */
	user: {
		/**
		 * name author commit
		 */
		name: string;
		/**
		 * avatar author commit
		 */
		avatar: string
	};
}
```

## Example usage

```js
const FacepunchCommits = require('facepunch-commits');

const commits = new FacepunchCommits({ 
	interval: 15000 // interval check commits in ms
});

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

(() => {
	commits.getCommitById(387280)
		.then(async (commit) => {
			console.log('Get commit', commit);
			
			const {likes, dislikes} = await commit.getLikes();
			console.log('likes:', likes);
			console.log('dislikes:', dislikes);
			
			// or
			await commit.getLikes();
			console.log('likes:', commit.likes);
			console.log('dislikes:', commit.dislikes);
		})
		
	// or
	commits.options.autoGetLikes = true;
	commits.getCommitById(387280)
		.then(async (commit) => {
			console.log('Get commit', commit);
			console.log('likes:', commit.likes);
			console.log('dislikes:', commit.dislikes);
		})
})();
```

## Running test
```shell
$ npm run validator
$ npm test
```

## For developers (suggest an idea)
### Usage
```shell
git clone https://github.com/ZakharYA/facepunch-commits.git
npm i
# code...
npm run validator
npm run build
# create pull request
```

## Members

Author [Zakhar Yaitskih](https://github.com/ZakharYA)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/facepunch-commits.svg

[npm-url]: https://www.npmjs.com/package/facepunch-commits

[downloads-image]: https://img.shields.io/npm/dm/facepunch-commits

[downloads-url]: https://npmcharts.com/compare/facepunch-commits?minimal=true

[github-actions-node-ci]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/test.yml/badge.svg

[github-actions-node-ci-url]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/test.yml

[github-actions-npm-publish]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/npm-publish.yml/badge.svg

[github-actions-npm-publish-url]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/npm-publish.yml
