import { ActionType, getType } from 'typesafe-actions';
import { cellActions } from '../actions';
import { MARK, NONE } from '../types/mark-types';

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
		case getType(cellActions.allocateBomb):
			return { ...state, isBomb: true };
		case getType(cellActions.allocateAdjacentBombs):
			return { ...state, adjacentBombs: action.payload.adjacentBombs };
		case getType(cellActions.markCell):
			return {
				...state,
				mark: action.payload.mark,
			};
		case getType(cellActions.revealCell):
		case getType(cellActions.loseGame):
			return { ...state, isRevealed: true };
		case getType(cellActions.reset):
			return initialState;
		default:
			return state;
	}
}
