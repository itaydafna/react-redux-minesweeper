import ACTIONS from '../actions';

const initialState = {
	isRevealed: false,
	isBomb: false,
	adjacentBombs: 0,
	mark: 'none',
};

export default function square(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.ALLOCATE_BOMB:
			return { ...state, isBomb: true };
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
			return { ...state, adjacentBombs: action.payload.adjacentBombs };
		case ACTIONS.REVEAL_SQUARE:
			return { ...state, isRevealed: true };
		default:
			return state;
	}
}
