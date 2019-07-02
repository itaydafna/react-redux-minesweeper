import { createActions } from 'redux-actions';
import ACTIONS from '../constants/ACTION_TYPES';

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
} = createActions({}, ...Object.values(ACTIONS));
