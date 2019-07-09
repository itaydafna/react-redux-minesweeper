import * as ACTIONS from '../types/ACTION_TYPES.ts';

export default function time(state = 0, action) {
	switch (action.type) {
		case ACTIONS.INCREMENT_TIME:
			return state + 1;
		case ACTIONS.RESET:
			return 0;
		default:
			return state;
	}
}
