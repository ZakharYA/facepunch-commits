import { ICommit } from '../types/CommitsResponse';
import { request } from 'undici';

const hideSymbols = ['▌', '▆', '▄', '▅', '▍', '▋', '▇', '█'];
const likeCountRegex = /div class="like-button (?:has-likes|no-likes)" like-type="[01]"(?:.*)?<span>(\d+)<\/span>/g;

export class Commit implements ICommit {
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

	likes: number|null;
	dislikes: number|null;

	constructor(commitsParams: ICommit) {
		this.branch = commitsParams.branch;
		this.changeset = commitsParams.changeset;
		this.created = commitsParams.created;
		this.id = commitsParams.id;
		this.message = commitsParams.message;
		this.repo = commitsParams.repo;
		this.user = commitsParams.user;

		this.likes = null;
		this.dislikes = null;
	}

	/**
	 * Checks if the commit message is hidden
	 */
	public isHide(): boolean {
		return hideSymbols.some((element) => this.message.includes(element));
	}

	/**
	 * get date created commit in format js
	 */
	public getDate(): Date {
		return new Date(this.created);
	}

	/**
	 * convert date(created) to unixtime
	 */
	public toUnixTime(): number {
		return this.getDate().getTime() / 1000;
	}

	/**
	 * get likes and dislikes in commit
	 */
	public getLikes(): Promise<{likes: number, dislikes: number}> {
		return request(this.urlCommit)
			.then(async (response) => {
				if (response.statusCode !== 200) throw await response.body.text();

				return response.body.text();
			})
			.then((result) => {
				const matches = Array.from(result.matchAll(likeCountRegex)).map((match) => match[1]);
				if (matches.length < 2) {
					throw new Error('bad parse like');
				}

				this.likes = Number(matches[0]);
				this.dislikes = Number(matches[1]);
				return {
					likes: this.likes,
					dislikes: this.dislikes
				};
			});
	}

	/**
	 * get url link commit
	 */
	public get urlCommit(): string {
		return `https://commits.facepunch.com/${this.id}`;
	}

	/**
	 * get username author commit
	 */
	public get username(): string {
		return this.user.name;
	}

	/**
	 * get avatar author commit
	 */
	public get avatar(): string {
		return this.user.avatar;
	}
}
