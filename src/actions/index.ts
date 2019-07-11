import { createStandardAction } from 'typesafe-actions';
import { MARK } from '../types/mark-types';
import { ConfigurationState } from '../reducers/configuration';

export interface CellLocationPayload {
	row: number;
	column: number;
}

export interface AllocateAdjacentBombsPayload extends CellLocationPayload {
	adjacentBombs: number;
}

export interface MarkCellPayload extends CellLocationPayload {
	mark: MARK;
}

export const configGameBoard = createStandardAction('CONFIG_GAME_BOARD')<ConfigurationState>();
export const allocateBomb = createStandardAction('ALLOCAremoTE_BOMB')<CellLocationPayload>();
export const allocateAdjacentBombs = createStandardAction('ALLOCATE_ADJACENT_BOMBS')<AllocateAdjacentBombsPayload>();
export const revealCell = createStandardAction('REVEAL_CELL')<CellLocationPayload>();
export const markCell = createStandardAction('MARK_CELL')<MarkCellPayload>();

export const incrementFlags = createStandardAction('INCREMENT_FLAGS')<undefined>();
export const decrementFlags = createStandardAction('DECREMENT_FLAGS')<undefined>();
export const startGame = createStandardAction('START_GAME')<undefined>();
export const loseGame = createStandardAction('LOSE_GAME')<undefined>();
export const winGame = createStandardAction('WIN_GAME')<undefined>();
export const reset = createStandardAction('RESET')<undefined>();
export const incrementTime = createStandardAction('INCREMENT_TIME')<undefined>();
export const setDanger = createStandardAction('SET_DANGER')<boolean>();
