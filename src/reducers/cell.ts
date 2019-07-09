import { ActionType } from 'typesafe-actions';
import { cellActions } from '../actions/index';
import { ALLOCATE_BOMB, ALLOCATE_ADJACENT_BOMBS, SET_MARK, REVEAL_CELL, LOSE_GAME, RESET } from '../types/ACTION_TYPES';
import { MARK, NONE } from '../types/MARK_TYPES';

export interface CellState {
	readonly isRevealed: boolean;
	readonly isBomb: boolean;
	readonly adjacentBombs: number;
	readonly mark: MARK;
}

export type CellAction = ActionType<typeof cellActions>;

const initialState: CellState = {
	isRevealed: false,
	isBomb: false,
	adjacentBombs: 0,
	mark: NONE,
};

export default function cell(state = initialState, action: CellAction): CellState {
	switch (action.type) {
		case ALLOCATE_BOMB:
			return { ...state, isBomb: true };
		case ALLOCATE_ADJACENT_BOMBS:
			return { ...state, adjacentBombs: action.payload.adjacentBombs };
		case SET_MARK:
			return {
				...state,
				mark: action.payload.mark,
			};
		case REVEAL_CELL:
		case LOSE_GAME:
			return { ...state, isRevealed: true };
		case RESET:
			return initialState;
		default:
			return state;
	}
}
