import { createActions } from 'redux-actions';
import ACTIONS from '../constants/ACTION_TYPES';

const { SET_DANGER, ...identityActions } = ACTIONS;

export const {
	configGameBoard,
	allocateBomb,
	allocateAdjacentBombs,
	revealCell,
	markCell,
	setMark,
	incrementFlags,
	decrementFlags,
	startGame,
	loseGame,
	winGame,
	reset,
	incrementTime,
	setDanger,
} = createActions({ [SET_DANGER]: danger => ({ danger }) }, ...Object.values(identityActions));
