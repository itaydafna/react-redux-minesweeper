import ACTIONS, { revealCell, gameOver } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { grid },
		} = getState();

		if (action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		const { row: actionRow, column: actionColumn } = action.payload;
		const cell = grid[actionRow][actionColumn];

		//if bomb is revealed reveal all grid (game over)
		if (cell.isBomb) {
			return dispatch(gameOver());
		}

		//if empty cell is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb grid
		if (!cell.adjacentBombs) {
			next(action);
			if (
				grid[actionRow - 1] &&
				grid[actionRow - 1][actionColumn - 1] &&
				!grid[actionRow - 1][actionColumn - 1].isBomb &&
				!grid[actionRow - 1][actionColumn - 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow - 1, column: actionColumn - 1 }));
			}
			if (
				grid[actionRow - 1] &&
				grid[actionRow - 1][actionColumn] &&
				!grid[actionRow - 1][actionColumn].isBomb &&
				!grid[actionRow - 1][actionColumn].isRevealed
			) {
				dispatch(revealCell({ row: actionRow - 1, column: actionColumn }));
			}
			if (
				grid[actionRow - 1] &&
				grid[actionRow - 1][actionColumn + 1] &&
				!grid[actionRow - 1][actionColumn + 1].isBomb &&
				!grid[actionRow - 1][actionColumn + 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow - 1, column: actionColumn + 1 }));
			}
			if (
				grid[actionRow][actionColumn - 1] &&
				!grid[actionRow][actionColumn - 1].isBomb &&
				!grid[actionRow][actionColumn - 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow, column: actionColumn - 1 }));
			}
			if (
				grid[actionRow][actionColumn + 1] &&
				!grid[actionRow][actionColumn + 1].isBomb &&
				!grid[actionRow][actionColumn + 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow, column: actionColumn + 1 }));
			}
			if (
				grid[actionRow + 1] &&
				grid[actionRow + 1][actionColumn - 1] &&
				!grid[actionRow + 1][actionColumn - 1].isBomb &&
				!grid[actionRow + 1][actionColumn - 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow + 1, column: actionColumn - 1 }));
			}
			if (
				grid[actionRow + 1] &&
				grid[actionRow + 1][actionColumn] &&
				!grid[actionRow + 1][actionColumn].isBomb &&
				!grid[actionRow + 1][actionColumn].isRevealed
			) {
				dispatch(revealCell({ row: actionRow + 1, column: actionColumn }));
			}
			if (
				grid[actionRow + 1] &&
				grid[actionRow + 1][actionColumn + 1] &&
				!grid[actionRow + 1][actionColumn + 1].isBomb &&
				!grid[actionRow + 1][actionColumn + 1].isRevealed
			) {
				dispatch(revealCell({ row: actionRow + 1, column: actionColumn + 1 }));
			}
		}

		next(action);
	};
}
