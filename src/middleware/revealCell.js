import * as ACTIONS from '../types/ACTION_TYPES.ts';
import traverseAdjacentCells from '../services/traverseAdjacentCells.ts';
import { revealCell, loseGame } from '../actions/index.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard,
			configuration: { numRows, numColumns },
		} = getState();

		if (action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const { row, column } = action.payload;
		const cell = gameBoard[row][column];

		//if bomb is revealed reveal all grid (game over)
		if (cell.isBomb) {
			return dispatch(loseGame());
		}
		console.log('here reveal');
		//if empty cell is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb grid
		if (!cell.adjacentBombs) {
			next(action);
			console.log('revealCell');
			traverseAdjacentCells({
				numRows,
				numColumns,
				row,
				column,
				callback: ({ row, column }) =>
					!gameBoard[row][column].isBomb &&
					//TODO: i think this might be causing too many calls - since cells don't get chance to be revealed
					!gameBoard[row][column].isRevealed &&
					dispatch(revealCell({ row, column })),
			});
			return;
		}

		next(action);
	};
}
