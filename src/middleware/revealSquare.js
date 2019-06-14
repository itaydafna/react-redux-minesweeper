import ACTIONS, { revealSquare, gameOver } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isFirstRevealed, squares },
		} = getState();

		if (action.type !== ACTIONS.REVEAL_SQUARE) {
			return next(action);
		}

		const { row: actionRow, column: actionColumn } = action.payload;
		const square = squares[actionRow][actionColumn];

		//if bomb is revealed reveal all squares (game over)
		if (square.isBomb) {
			return dispatch(gameOver());
		}

		//if empty square is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb squares
		if (!square.adjacentBombs) {
			next(action);
			if (
				squares[actionRow - 1] &&
				squares[actionRow - 1][actionColumn - 1] &&
				!squares[actionRow - 1][actionColumn - 1].isBomb &&
				!squares[actionRow - 1][actionColumn - 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow - 1, column: actionColumn - 1 }));
			}
			if (
				squares[actionRow - 1] &&
				squares[actionRow - 1][actionColumn] &&
				!squares[actionRow - 1][actionColumn].isBomb &&
				!squares[actionRow - 1][actionColumn].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow - 1, column: actionColumn }));
			}
			if (
				squares[actionRow - 1] &&
				squares[actionRow - 1][actionColumn + 1] &&
				!squares[actionRow - 1][actionColumn + 1].isBomb &&
				!squares[actionRow - 1][actionColumn + 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow - 1, column: actionColumn + 1 }));
			}
			if (
				squares[actionRow][actionColumn - 1] &&
				!squares[actionRow][actionColumn - 1].isBomb &&
				!squares[actionRow][actionColumn - 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow, column: actionColumn - 1 }));
			}
			if (
				squares[actionRow][actionColumn + 1] &&
				!squares[actionRow][actionColumn + 1].isBomb &&
				!squares[actionRow][actionColumn + 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow, column: actionColumn + 1 }));
			}
			if (
				squares[actionRow + 1] &&
				squares[actionRow + 1][actionColumn - 1] &&
				!squares[actionRow + 1][actionColumn - 1].isBomb &&
				!squares[actionRow + 1][actionColumn - 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow + 1, column: actionColumn - 1 }));
			}
			if (
				squares[actionRow + 1] &&
				squares[actionRow + 1][actionColumn] &&
				!squares[actionRow + 1][actionColumn].isBomb &&
				!squares[actionRow + 1][actionColumn].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow + 1, column: actionColumn }));
			}
			if (
				squares[actionRow + 1] &&
				squares[actionRow + 1][actionColumn + 1] &&
				!squares[actionRow + 1][actionColumn + 1].isBomb &&
				!squares[actionRow + 1][actionColumn + 1].isRevealed
			) {
				dispatch(revealSquare({ row: actionRow + 1, column: actionColumn + 1 }));
			}
		}

		next(action);
	};
}
