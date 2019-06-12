import ACTIONS, { allocateAdjacentBombs } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isFirstRevealed, squares },
		} = getState();
		if (isFirstRevealed || action.type !== ACTIONS.REVEAL_SQUARE) {
			return next(action);
		}

		squares.forEach((columns, row) => {
			columns.forEach((_, column) => {
				let adjacentBombs = 0;
				if (squares[row - 1] && squares[row - 1][column - 1] && squares[row - 1][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (squares[row - 1] && squares[row - 1][column] && squares[row - 1][column].isBomb) {
					++adjacentBombs;
				}
				if (squares[row - 1] && squares[row - 1][column + 1] && squares[row - 1][column + 1].isBomb) {
					++adjacentBombs;
				}
				if (squares[row][column - 1] && squares[row][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (squares[row][column + 1] && squares[row][column + 1].isBomb) {
					++adjacentBombs;
				}
				if (squares[row + 1] && squares[row + 1][column - 1] && squares[row + 1][column - 1].isBomb) {
					++adjacentBombs;
				}
				if (squares[row + 1] && squares[row + 1][column] && squares[row + 1][column].isBomb) {
					++adjacentBombs;
				}
				if (squares[row + 1] && squares[row + 1][column + 1] && squares[row + 1][column + 1].isBomb) {
					++adjacentBombs;
				}
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		next(action);
	};
}
