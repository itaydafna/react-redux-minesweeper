import { ActionType, getType } from 'typesafe-actions';
import { incrementTime, reset } from '../actions';

const timeActions = { incrementTime, reset };

export type TimeAction = ActionType<typeof timeActions>;

export default function time(state: number = 0, action: TimeAction): number {
	switch (action.type) {
		case getType(incrementTime):
			return state + 1;
		case getType(reset):
			return 0;
		default:
			return state;
	}
}
