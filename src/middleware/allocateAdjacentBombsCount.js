import ACTIONS from '../constants/ACTION_TYPES'
import traverseAdjacentCells from '../services/traverseAdjacentCells'
import { allocateAdjacentBombs } from '../actions';

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
				traverseAdjacentCells({
					grid,
					row,
					column,
					callback: ({cell})=> cell.isBomb && ++adjacentBombs
				})
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		next(action);
	};
}
