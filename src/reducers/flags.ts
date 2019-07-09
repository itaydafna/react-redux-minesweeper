import { ActionType, getType } from 'typesafe-actions';
import { incrementFlags, decrementFlags, reset } from '../actions';

const flagActions = { incrementFlags, decrementFlags, reset };

export type FlagsAction = ActionType<typeof flagActions>;

const initialState: number = 0;

export default function flags(state = initialState, action: FlagsAction): number {
	switch (action.type) {
		case getType(incrementFlags):
			return ++state;
		case getType(decrementFlags):
			return --state;
		case getType(reset):
			return 0;
		default:
			return state;
	}
}
