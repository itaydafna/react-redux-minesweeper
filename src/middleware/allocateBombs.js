import { random, flatten } from 'lodash/fp';
import ACTIONS, { allocateBomb } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isFirstRevealed, bombs, columns, rows },
		} = getState();
		if (isFirstRevealed || action.type !== ACTIONS.REVEAL_SQUARE) {
			return next(action);
		}

		const bombCandidatePool = flatten(
			[...new Array(rows)].map((_, row) => [...new Array(columns)].map((_, column) => ({ row, column })))
		)
			//filter out first revealed square from "bomb-candidates"
			.filter(square => !(square.row === action.payload.row && square.column === action.payload.column));

		for (let i = 0; i < bombs; i++) {
			const randomSquareIndex = random(0, bombCandidatePool.length - 1);
			const randomSquare = bombCandidatePool.splice(randomSquareIndex, 1)[0];
			dispatch(allocateBomb(randomSquare));
		}

		next(action);
	};
}
