export interface Commit {
	/**
	 * unique id commit
	 */
	id: number,
	/**
	 * name repository
	 */
	repo: string,
	/**
	 * name branch
	 */
	branch: string,
	/**
	 * changeset id
	 */
	changeset: string,
	/**
	 * date created fixation commit (PLS SUPPORT UNIXTIME!!!)
	 */
	created: string, // support pls unixtime, fucking facepunch
	/**
	 * commit message
	 */
	message: string,
	/**
	 * user info commit
	 */
	user: {
		/**
		 * name author commit
		 */
		name: string,
		/**
		 * avatar author commit
		 */
		avatar: string
	}
}

export default interface CommitsResponse {
	total: number,
	skip: number,
	take: number,
	results: Commit[]
}
