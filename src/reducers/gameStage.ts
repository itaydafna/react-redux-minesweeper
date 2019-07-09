import { ActionType, getType } from 'typesafe-actions';
import { GameStage, BOARD_CONFIG, GAME_LOST, GAME_WON, PLAY } from '../types/game-stage-types';
import { gameStageActions } from '../actions';

export type GameStageAction = ActionType<typeof gameStageActions>;

const initialState: GameStage = BOARD_CONFIG;

export default function gameStage(state = initialState, action: GameStageAction): GameStage {
	switch (action.type) {
		case getType(gameStageActions.loseGame):
			return GAME_LOST;
		case getType(gameStageActions.winGame):
			return GAME_WON;
		case getType(gameStageActions.startGame):
			return PLAY;
		case getType(gameStageActions.reset):
			return BOARD_CONFIG;
		default:
			return state;
	}
}
