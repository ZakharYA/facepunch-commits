/*!
 * facepunch-commits
 * Copyright(c) 2021 Zakhar
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { customFunctions } from './types/customFunctions';

const hideSymbols = [ '▌', '▆', '▄', '▅', '▍', '▋', '▇', '█' ];

const customFunctions: customFunctions = {
	isHide(): boolean {
		for (let i = 0; i < hideSymbols.length; i++) {
			if (this.message.indexOf(hideSymbols[i]) != -1) return true;
		}

		return false;
	},

	toUnixTime(): number {
		return new Date(this.created).getTime() / 1000;
	}
};

export = customFunctions;
