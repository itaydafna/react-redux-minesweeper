import ACTIONS from '../constants/ACTION_TYPES';
import cell from './cell';

const initialState = {
	isDirty: false,
	columns: 6,
	rows: 6,
	bombs: 6,
	flags: 0,
	grid: [],
};

function row(state = [], action) {
	switch (action.type) {
		case ACTIONS.CONFIG_GAME_BOARD:
			return [...new Array(action.payload.columns)].map(() => cell(undefined, action));
		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.REVEAL_CELL:
		case ACTIONS.SET_MARK:
			return [
				...state.slice(0, action.payload.column),
				cell(state[action.payload.column], action),
				...state.slice(action.payload.column + 1),
			];
		case ACTIONS.LOSE_GAME:
		case ACTIONS.RESET:
			return state.map(c => cell(c, action));
		default:
			return state;
	}
}

function grid(state = initialState.grid, action) {
	switch (action.type) {
		case ACTIONS.CONFIG_GAME_BOARD:
			return [...new Array(action.payload.rows)].map(() => row(undefined, action));
		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.REVEAL_CELL:
		case ACTIONS.SET_MARK:
			return [
				...state.slice(0, action.payload.row),
				row(state[action.payload.row], action),
				...state.slice(action.payload.row + 1),
			];
		case ACTIONS.LOSE_GAME:
		case ACTIONS.RESET:
			return state.map(r => row(r, action));
		default:
			return state;
	}
}

export default function gameBoard(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.CONFIG_GAME_BOARD:
			return {
				...state,
				columns: action.payload.columns,
				rows: action.payload.rows,
				bombs: action.payload.bombs,
				grid: grid(state.grid, action),
			};

		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.SET_MARK:
		case ACTIONS.LOSE_GAME:
			return {
				...state,
				grid: grid(state.grid, action),
			};
		case ACTIONS.REVEAL_CELL:
			return {
				...state,
				isDirty: true,
				grid: grid(state.grid, action),
			};
		case ACTIONS.INCREMENT_FLAGS:
			return {
				...state,
				flags: ++state.flags,
			};
		case ACTIONS.DECREMENT_FLAGS:
			return {
				...state,
				flags: --state.flags,
			};
		case ACTIONS.RESET:
			return {
				...state,
				isDirty: false,
				flags: 0,
				grid: grid(state.grid, action),
			};

		default:
			return state;
	}
}
