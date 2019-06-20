import ACTIONS from '../constants/ACTION_TYPES';

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
