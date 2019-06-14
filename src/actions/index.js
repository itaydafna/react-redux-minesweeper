import ACTIONS from '../constants/ACTION_TYPES'

export const initGameBoard = payload => ({ type: ACTIONS.INIT_GAME_BOARD, payload });

export const allocateBomb = payload => ({ type: ACTIONS.ALLOCATE_BOMB, payload });

export const allocateAdjacentBombs = payload => ({ type: ACTIONS.ALLOCATE_ADJACENT_BOMBS, payload });

export const revealCell = payload => ({ type: ACTIONS.REVEAL_CELL, payload });

export const gameOver = () => ({ type: ACTIONS.GAME_OVER });