import { ActionType, getType } from 'typesafe-actions';
import { GameStage, BOARD_CONFIG, GAME_LOST, GAME_WON, PLAY } from '../types/game-stage-types';
import { loseGame, winGame, startGame, reset } from '../actions';

const gameStageActions = { loseGame, winGame, startGame, reset };

export type GameStageAction = ActionType<typeof gameStageActions>;

const initialState: GameStage = BOARD_CONFIG;

export default function gameStage(state = initialState, action: GameStageAction): GameStage {
	switch (action.type) {
		case getType(loseGame):
			return GAME_LOST;
		case getType(winGame):
			return GAME_WON;
		case getType(startGame):
			return PLAY;
		case getType(reset):
			return BOARD_CONFIG;
		default:
			return state;
	}
}
