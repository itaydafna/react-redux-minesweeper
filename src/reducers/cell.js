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
		case ACTIONS.MARK_CELL:
			return {
				...state,
				mark:
					state.mark === MARK_TYPES.NONE
						? MARK_TYPES.FLAG
						: state.mark === MARK_TYPES.FLAG
						? MARK_TYPES.QUESTION_MARK
						: MARK_TYPES.NONE,
			};
		case ACTIONS.REVEAL_CELL:
		case ACTIONS.GAME_OVER:
			return { ...state, isRevealed: true };
		default:
			return state;
	}
}
