<h1 align="center">Watch facepunch commits</h1>

<h2 align="center">
    <a href="commits.facepunch.com">
        <img width="134" src="https://commits.facepunch.com/logo.svg">
    </a>
</h2>

This library allows you to track the commits from the [facepunch site](https://commits.facepunch.com).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build][travis-image]][travis-url]
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

## Callback also has additional features

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

## Example return in callback function

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

## People

Author [Zakhar Yaitskih](https://github.com/ZakharYA)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/facepunch-commits.svg

[npm-url]: https://www.npmjs.com/package/facepunch-commits

[downloads-image]: https://img.shields.io/npm/dm/facepunch-commits

[downloads-url]: https://npmcharts.com/compare/facepunch-commits?minimal=true

[travis-image]: https://travis-ci.com/ZakharYA/facepunch-commits.svg?branch=master

[travis-url]: https://travis-ci.com/ZakharYA/facepunch-commits

[github-actions-node-ci]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/test.yml/badge.svg

[github-actions-node-ci-url]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/test.yml

[github-actions-npm-publish]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/npm-publish.yml/badge.svg

[github-actions-npm-publish-url]: https://github.com/ZakharYA/facepunch-commits/actions/workflows/npm-publish.yml