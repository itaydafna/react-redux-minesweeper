import ACTIONS from '../constants/ACTION_TYPES';
import { incrementTime } from '../actions';

export default function({ getState, dispatch }) {
	let timeInterval = null;
	return next => action => {
		if (action.type === ACTIONS.START_GAME) {
			timeInterval = setInterval(() => dispatch(incrementTime()), 1000);
		}

		if (action.type === ACTIONS.GAME_OVER) {
			clearInterval(timeInterval);
		}
		next(action);
	};
}
