import { createStandardAction } from 'typesafe-actions';
import * as ACTIONS from '../types/ACTION_TYPES';
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

export const configGameBoard = createStandardAction(ACTIONS.CONFIG_GAME_BOARD)<ConfigurationState>();
export const allocateBomb = createStandardAction(ACTIONS.ALLOCATE_BOMB)<CellLocationPayload>();
export const allocateAdjacentBombs = createStandardAction(ACTIONS.ALLOCATE_ADJACENT_BOMBS)<
	AllocateAdjacentBombsPayload
>();
export const revealCell = createStandardAction(ACTIONS.REVEAL_CELL)<CellLocationPayload>();
export const markCell = createStandardAction(ACTIONS.MARK_CELL)<MarkCellPayload>();

export const incrementFlags = createStandardAction(ACTIONS.INCREMENT_FLAGS)<undefined>();
export const decrementFlags = createStandardAction(ACTIONS.DECREMENT_FLAGS)<undefined>();
export const startGame = createStandardAction(ACTIONS.START_GAME)<undefined>();
export const loseGame = createStandardAction(ACTIONS.LOSE_GAME)<undefined>();
export const winGame = createStandardAction(ACTIONS.WIN_GAME)<undefined>();
export const reset = createStandardAction(ACTIONS.RESET)<undefined>();
export const incrementTime = createStandardAction(ACTIONS.INCREMENT_TIME)<undefined>();
export const setDanger = createStandardAction(ACTIONS.SET_DANGER)<boolean>();

export const cellActions = { allocateBomb, allocateAdjacentBombs, markCell, revealCell, loseGame, reset };
export const gameStageActions = { loseGame, winGame, startGame, reset };
