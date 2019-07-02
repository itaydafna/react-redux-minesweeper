import ACTIONS from '../constants/ACTION_TYPES';
import MARK_TYPES from '../constants/MARK_TYPES';

const initialState = {
	isRevealed: false,
	isBomb: false,
	adjacentBombs: 0,
	mark: MARK_TYPES.NONE,
};

export default function cell(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.ALLOCATE_BOMB:
			return { ...state, isBomb: true };
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
			return { ...state, adjacentBombs: action.payload.adjacentBombs };
		case ACTIONS.SET_MARK:
			return {
				...state,
				mark: action.payload.mark,
			};
		case ACTIONS.REVEAL_CELL:
		case ACTIONS.LOSE_GAME:
			return { ...state, isRevealed: true };
		case ACTIONS.RESET:
			return initialState;
		default:
			return state;
	}
}
