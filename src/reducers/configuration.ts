import { ActionType, getType } from 'typesafe-actions';
import { configGameBoard } from '../actions';

export type ConfigAction = ActionType<typeof configGameBoard>;

export interface ConfigurationState {
	readonly numRows: number;
	readonly numColumns: number;
	readonly bombs: number;
}

const initialState: ConfigurationState = {
	numColumns: 6,
	numRows: 6,
	bombs: 6,
};

export default function configuration(state = initialState, action: ConfigAction): ConfigurationState {
	if (action.type === getType(configGameBoard)) return action.payload;
	return state;
}
