import { ActionType, getType } from 'typesafe-actions';
import {
	configGameBoard,
	allocateBomb,
	allocateAdjacentBombs,
	revealCell,
	markCell,
	loseGame,
	reset,
} from '../actions';
import cell, { CellState } from './cell';

const gameBoardActions = {
	configGameBoard,
	allocateBomb,
	allocateAdjacentBombs,
	revealCell,
	markCell,
	loseGame,
	reset,
};

export type RowState = readonly CellState[];

export type GameBoardState = readonly RowState[];

export type GameBoardAction = ActionType<typeof gameBoardActions>;

function row(state: RowState = [], action: GameBoardAction): RowState {
	switch (action.type) {
		case getType(configGameBoard):
			return [...new Array(action.payload.numColumns)].map(() => cell(undefined, action));
		case getType(allocateBomb):
		case getType(allocateAdjacentBombs):
		case getType(revealCell):
		case getType(markCell):
			return [
				...state.slice(0, action.payload.column),
				cell(state[action.payload.column], action),
				...state.slice(action.payload.column + 1),
			];
		case getType(loseGame):
		case getType(reset):
			return state.map(c => cell(c, action));
		default:
			return state;
	}
}

export default function gameBoard(state: GameBoardState = [], action: GameBoardAction): GameBoardState {
	switch (action.type) {
		case getType(configGameBoard):
			return [...new Array(action.payload.numRows)].map(() => row(undefined, action));
		case getType(allocateBomb):
		case getType(allocateAdjacentBombs):
		case getType(revealCell):
		case getType(markCell):
			return [
				...state.slice(0, action.payload.row),
				row(state[action.payload.row], action),
				...state.slice(action.payload.row + 1),
			];
		case getType(loseGame):
		case getType(reset):
			return state.map(r => row(r, action));
		default:
			return state;
	}
}
