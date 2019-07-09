import GAME_STAGE_TYPES from '../types/GAME_STAGE_TYPES';
import * as ACTIONS from '../types/ACTION_TYPES.ts';

export default function gameStage(state = GAME_STAGE_TYPES.BOARD_CONFIG, action) {
	switch (action.type) {
		case ACTIONS.LOSE_GAME:
			return GAME_STAGE_TYPES.GAME_LOST;
		case ACTIONS.WIN_GAME:
			return GAME_STAGE_TYPES.GAME_WON;
		case ACTIONS.START_GAME:
			return GAME_STAGE_TYPES.PLAY;
		case ACTIONS.RESET:
			return GAME_STAGE_TYPES.BOARD_CONFIG;
		default:
			return state;
	}
}
