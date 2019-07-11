import { MiddlewareAPI, Dispatch } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { incrementTime, startGame, loseGame, winGame, reset } from '../actions';

const timeMiddlewareActions = { incrementTime, startGame, loseGame, winGame, reset };

export type TimeMiddlewareAction = ActionType<typeof timeMiddlewareActions>;

export default function({ dispatch }: MiddlewareAPI) {
	let timeInterval: number;
	return (next: Dispatch) => (action: TimeMiddlewareAction) => {
		if (action.type === getType(startGame)) {
			timeInterval = setInterval(() => dispatch(incrementTime()), 1000);
		}

		if (action.type === getType(loseGame) || action.type === getType(winGame) || action.type === getType(reset)) {
			clearInterval(timeInterval);
		}
		next(action);
	};
}
