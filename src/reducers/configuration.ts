import { ActionType, getType } from 'typesafe-actions';
import { configGameBoard } from '../actions';

interface GameProfiles {
	[key: string]: {
		id: string;
		configuration: ConfigurationState;
	};
}

export const gameProfiles: GameProfiles = {
	beginner: {
		id: 'beginner',
		configuration: { numRows: 9, numColumns: 9, bombs: 10 },
	},
	intermediate: {
		id: 'intermediate',
		configuration: { numRows: 15, numColumns: 15, bombs: 40 },
	},
	expert: {
		id: 'expert',
		configuration: { numRows: 16, numColumns: 30, bombs: 99 },
	},
};

export type ConfigAction = ActionType<typeof configGameBoard>;

export interface ConfigurationState {
	readonly numRows: number;
	readonly numColumns: number;
	readonly bombs: number;
}

export const initialState: ConfigurationState = gameProfiles.beginner.configuration;

export default function configuration(state = initialState, action: ConfigAction): ConfigurationState {
	if (action.type === getType(configGameBoard)) return action.payload;
	return state;
}
