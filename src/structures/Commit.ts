import { ICommit } from '../types/CommitsResponse';

const hideSymbols = ['▌', '▆', '▄', '▅', '▍', '▋', '▇', '█'];

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

	constructor(commitsParams: ICommit) {
		this.branch = commitsParams.branch;
		this.changeset = commitsParams.changeset;
		this.created = commitsParams.created;
		this.id = commitsParams.id;
		this.message = commitsParams.message;
		this.repo = commitsParams.repo;
		this.user = commitsParams.user;
	}

	/**
	 * Checks if the commit message is hidden
	 */
	public get isHide(): boolean {
		return hideSymbols.some((element) => this.message.includes(element));
	}

	/**
	 * convert date(created) to unixtime
	 */
	public get toUnixTime(): number {
		return new Date(this.created).getTime() / 1000;
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
