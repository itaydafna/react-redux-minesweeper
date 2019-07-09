import { ActionType, getType } from 'typesafe-actions';
import {
	configGameBoard,
	allocateBomb,
	allocateAdjacentBombs,
	markCell,
	revealCell,
	loseGame,
	reset,
} from '../actions';
import { MARK, NONE } from '../types/mark-types';

const cellActions = { configGameBoard, allocateBomb, allocateAdjacentBombs, markCell, revealCell, loseGame, reset };

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
		case getType(allocateBomb):
			return { ...state, isBomb: true };
		case getType(allocateAdjacentBombs):
			return { ...state, adjacentBombs: action.payload.adjacentBombs };
		case getType(markCell):
			return {
				...state,
				mark: action.payload.mark,
			};
		case getType(revealCell):
		case getType(loseGame):
			return { ...state, isRevealed: true };
		case getType(reset):
			return initialState;
		default:
			return state;
	}
}
