import * as ACTIONS from '../types/ACTION_TYPES.ts';
import traverseAdjacentCells from '../services/traverseAdjacentCells.ts';
import { allocateAdjacentBombs, startGame } from '../actions/index.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		const {
			gameBoard: { isDirty, grid },
		} = getState();
		if (isDirty || action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		grid.forEach((columns, row) => {
			columns.forEach((_, column) => {
				let adjacentBombs = 0;
				traverseAdjacentCells({
					grid,
					row,
					column,
					callback: ({ row, column }) => grid[row][column].isBomb && ++adjacentBombs,
				});
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		dispatch(startGame());

		next(action);
	};
}
