import ACTIONS from '../actions';
import square from './square';

const initialState = {
	isFirstRevealed: false,
	columns: 0,
	rows: 0,
	bombs: 0,
	squares: [],
};

// squares reducer TODO: consider moving to a sperate module
function squares(state = initialState.squares, action) {
	switch (action.type) {
		case ACTIONS.INIT_GAME_BOARD:
			return [...new Array(action.payload.rows)].map(row =>
				[...new Array(action.payload.columns)].map(col => square(undefined, action))
			);
		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.REVEAL_SQUARE:
			return [
				...state.slice(0, action.payload.row),
				[
					...state[action.payload.row].slice(0, action.payload.column),
					square(state[action.payload.row][action.payload.column], action),
					...state[action.payload.row].slice(action.payload.column + 1),
				],
				...state.slice(action.payload.row + 1),
			];
		case ACTIONS.GAME_OVER:
			return state.map(row=>row.map(s=>square(s,action)))	
		default:
			return state;
	}
}

export default function gameBoard(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.INIT_GAME_BOARD:
			return {
				...state,
				columns: action.payload.columns,
				rows: action.payload.rows,
				bombs: action.payload.bombs,
				squares: squares(state.squares, action),
			};

		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.GAME_OVER:
			return {
				...state,
				squares: squares(state.squares, action),
			};
		case ACTIONS.REVEAL_SQUARE:
			return {
				...state,
				isFirstRevealed: true,
				squares: squares(state.squares, action),
			};

		default:
			return state;
	}
}
