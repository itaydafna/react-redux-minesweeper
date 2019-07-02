import GAME_STAGE_TYPES from '../constants/GAME_STAGE_TYPES';
import ACTIONS from '../constants/ACTION_TYPES';

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
