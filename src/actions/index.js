const ACTIONS = {
	INIT_GAME_BOARD: 'INIT_GAME_BOARD',
  ALLOCATE_BOMB: 'ALLOCATE_BOMB',
  REVEAL_SQUARE: 'REVEAL_SQUARE' 
};

export const initGameBoard = payload => ({ type: ACTIONS.INIT_GAME_BOARD, payload });

export const allocateBomb = payload => ({ type: ACTIONS.ALLOCATE_BOMB, payload });

export const revealSquare = payload => ({ type: ACTIONS.REVEAL_SQUARE, payload });

export default ACTIONS;
