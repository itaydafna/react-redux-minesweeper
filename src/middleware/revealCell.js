import ACTIONS, { revealCell, gameOver } from '../actions';
import traverseAdjacentCells from '../services/traverseAdjacentCells';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { grid },
		} = getState();

		if (action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const { row, column } = action.payload;
		const cell = grid[row][column];

		//if bomb is revealed reveal all grid (game over)
		if (cell.isBomb) {
			return dispatch(gameOver());
		}

		//if empty cell is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb grid
		if (!cell.adjacentBombs) {
			next(action);
			traverseAdjacentCells({
				grid,
				row,
				column,
				callback: ({ row, column, cell }) =>
					console.log({ row, column, cell }) ||
					(!cell.isBomb && !cell.isRevealed && dispatch(revealCell({ row, column }))),
			});
		}

		next(action);
	};
}
