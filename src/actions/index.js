const ACTIONS = {
	INIT_GAME_BOARD: 'INIT_GAME_BOARD',
  ALLOCATE_BOMB: 'ALLOCATE_BOMB',
  ALLOCATE_ADJACENT_BOMBS: 'ALLOCATE_ADJACENT_BOMBS',
  REVEAL_SQUARE: 'REVEAL_SQUARE',
  GAME_OVER: 'GAME_OVER'
};

export const initGameBoard = payload => ({ type: ACTIONS.INIT_GAME_BOARD, payload });

export const allocateBomb = payload => ({ type: ACTIONS.ALLOCATE_BOMB, payload });

export const allocateAdjacentBombs = payload => ({ type: ACTIONS.ALLOCATE_ADJACENT_BOMBS, payload });

export const revealSquare = payload => ({ type: ACTIONS.REVEAL_SQUARE, payload });

export const gameOver = () => ({ type: ACTIONS.GAME_OVER });

export default ACTIONS;
