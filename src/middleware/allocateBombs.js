import * as ACTIONS from '../types/ACTION_TYPES.ts';
import { random, flatten } from 'lodash/fp';
import { allocateBomb } from '../actions/index.ts';
import { PLAY } from '../types/game-stage-types.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			configuration: { bombs, numColumns, numRows },
			gameStage,
		} = getState();
		if (gameStage === PLAY || action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const bombCandidatePool = flatten(
			[...new Array(numRows)].map((_, row) =>
				[...new Array(numColumns)].map((_, column) => ({
					row,
					column,
				}))
			)
		)
			//filter out first revealed cell from "bomb-candidates"
			.filter(cell => !(cell.row === action.payload.row && cell.column === action.payload.column));

		console.log('here allocateBombs');
		for (let i = 0; i < bombs; i++) {
			const randomCellIndex = random(0, bombCandidatePool.length - 1);
			const randomCell = bombCandidatePool.splice(randomCellIndex, 1)[0];
			dispatch(allocateBomb(randomCell));
		}
		next(action);
	};
}
