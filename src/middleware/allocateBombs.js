import ACTIONS from '../constants/ACTION_TYPES'
import { random, flatten } from 'lodash/fp';
import { allocateBomb } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isFirstRevealed, bombs, columns, rows },
		} = getState();
		if (isFirstRevealed || action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const bombCandidatePool = flatten(
			[...new Array(rows)].map((_, row) => [...new Array(columns)].map((_, column) => ({ row, column })))
		)
			//filter out first revealed cell from "bomb-candidates"
			.filter(cell => !(cell.row === action.payload.row && cell.column === action.payload.column));

		for (let i = 0; i < bombs; i++) {
			const randomCellIndex = random(0, bombCandidatePool.length - 1);
			const randomCell = bombCandidatePool.splice(randomCellIndex, 1)[0];
			dispatch(allocateBomb(randomCell));
		}
		next(action);
	};
}
