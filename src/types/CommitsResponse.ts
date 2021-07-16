export interface ICommit {
	id: number;
	repo: string;
	branch: string;
	changeset: string;
	created: string;
	message: string;
	user: { name: string; avatar: string };
}

interface CommitsResponse {
	total: number;
	skip: number;
	take: number;
	results: ICommit[];
}

export default CommitsResponse;
