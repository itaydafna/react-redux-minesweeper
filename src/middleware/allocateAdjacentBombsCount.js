import ACTIONS, { allocateAdjacentBombs } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isFirstRevealed, grid },
		} = getState();
		if (isFirstRevealed || action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		grid.forEach((columns, row) => {
			columns.forEach((_, column) => {
				let adjacentBombs = 0;
				if (grid[row - 1] && grid[row - 1][column - 1] && grid[row - 1][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (grid[row - 1] && grid[row - 1][column] && grid[row - 1][column].isBomb) {
					++adjacentBombs;
				}
				if (grid[row - 1] && grid[row - 1][column + 1] && grid[row - 1][column + 1].isBomb) {
					++adjacentBombs;
				}
				if (grid[row][column - 1] && grid[row][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (grid[row][column + 1] && grid[row][column + 1].isBomb) {
					++adjacentBombs;
				}
				if (grid[row + 1] && grid[row + 1][column - 1] && grid[row + 1][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (grid[row + 1] && grid[row + 1][column] && grid[row + 1][column].isBomb) {
					++adjacentBombs;
				}
				if (grid[row + 1] && grid[row + 1][column + 1] && grid[row + 1][column + 1].isBomb) {
					++adjacentBombs;
				}
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		next(action);
	};
}
