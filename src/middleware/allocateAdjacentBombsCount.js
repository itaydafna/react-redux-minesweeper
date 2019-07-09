import * as ACTIONS from '../types/ACTION_TYPES.ts';
import traverseAdjacentCells from '../services/traverseAdjacentCells.ts';
import { allocateAdjacentBombs, startGame } from '../actions/index.ts';
import { PLAY } from '../types/game-stage-types.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		const { gameBoard, gameStage } = getState();
		if (gameStage === PLAY || action.type !== ACTIONS.REVEAL_CELL) {
			return next(action);
		}

		gameBoard.forEach((columns, row) => {
			columns.forEach((_, column) => {
				let adjacentBombs = 0;
				traverseAdjacentCells({
					gameBoard,
					row,
					column,
					callback: ({ row, column }) => gameBoard[row][column].isBomb && ++adjacentBombs,
				});
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		dispatch(startGame());

		next(action);
	};
}
