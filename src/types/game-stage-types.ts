export const BOARD_CONFIG = 'BOARD_CONFIG';
export type BOARD_CONFIG = typeof BOARD_CONFIG;
export const PLAY = 'PLAY';
export type PLAY = typeof PLAY;
export const GAME_LOST = 'GAME_LOST';
export type GAME_LOST = typeof GAME_LOST;
export const GAME_WON = 'GAME_WON';
export type GAME_WON = typeof GAME_WON;

export type GameStage = BOARD_CONFIG | PLAY | GAME_LOST | GAME_WON;
