/*!
 * facepunch-commits
 * Copyright(c) 2021 Zakhar
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
import { CustomFunctions } from './types/customFunctions';

const hideSymbols = ['▌', '▆', '▄', '▅', '▍', '▋', '▇', '█'];

const customFunctions: CustomFunctions = {
	isHide(): boolean {
		for (const symbol of hideSymbols) {
			if (this.message.indexOf(symbol) > -1) return true;
		}

		return false;
	},

	toUnixTime(): number {
		return new Date(this.created).getTime() / 1000;
	},
};

export = customFunctions;
