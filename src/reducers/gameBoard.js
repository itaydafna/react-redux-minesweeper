import * as ACTIONS from '../types/ACTION_TYPES.ts';
import cell from './cell.ts';

const initialState = {
	grid: [],
};

function row(state = [], action) {
	switch (action.type) {
		case ACTIONS.CONFIG_GAME_BOARD:
			return [...new Array(action.payload.columns)].map(() => cell(undefined, action));
		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.REVEAL_CELL:
		case ACTIONS.MARK_CELL:
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
		case ACTIONS.MARK_CELL:
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
				grid: grid(state.grid, action),
			};

		case ACTIONS.ALLOCATE_BOMB:
		case ACTIONS.ALLOCATE_ADJACENT_BOMBS:
		case ACTIONS.MARK_CELL:
		case ACTIONS.LOSE_GAME:
			return {
				...state,
				grid: grid(state.grid, action),
			};
		case ACTIONS.REVEAL_CELL:
			return {
				...state,
				grid: grid(state.grid, action),
			};
		case ACTIONS.RESET:
			return {
				...state,
				grid: grid(state.grid, action),
			};

		default:
			return state;
	}
}
