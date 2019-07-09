import * as ACTIONS from '../types/ACTION_TYPES.ts';
import traverseAdjacentCells from '../services/traverseAdjacentCells.ts';
import { revealCell, loseGame } from '../actions/index.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		const { gameBoard } = getState();

		if (action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const { row, column } = action.payload;
		const cell = gameBoard[row][column];

		//if bomb is revealed reveal all grid (game over)
		if (cell.isBomb) {
			return dispatch(loseGame());
		}

		//if empty cell is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb grid
		if (!cell.adjacentBombs) {
			next(action);
			traverseAdjacentCells({
				gameBoard,
				row,
				column,
				callback: ({ row, column }) =>
					!gameBoard[row][column].isBomb &&
					!gameBoard[row][column].isRevealed &&
					dispatch(revealCell({ row, column })),
			});
			return;
		}

		next(action);
	};
}
