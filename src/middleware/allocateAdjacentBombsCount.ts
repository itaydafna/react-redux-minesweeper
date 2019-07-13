import { MiddlewareAPI, Dispatch } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import traverseAdjacentCells from '../services/traverseAdjacentCells';
import { allocateAdjacentBombs, startGame, revealCell, CellLocationPayload } from '../actions';
import { PLAY } from '../types/game-stage-types';
import { RowState } from '../reducers/gameBoard';

export type AdjacentBombsMiddlewareAction = ActionType<typeof revealCell>;

export default function({ getState, dispatch }: MiddlewareAPI) {
	return (next: Dispatch) => (action: AdjacentBombsMiddlewareAction) => {
		const {
			gameStage,
			gameBoard,
			configuration: { numRows, numColumns },
		} = getState();
		if (gameStage === PLAY || action.type !== getType(revealCell)) {
			return next(action);
		}
		gameBoard.forEach((columns: RowState, row: number) => {
			columns.forEach((_, column: number) => {
				//no need to allocate adjacent bombs count to bomb cells
				if (gameBoard[row][column].isBomb) return;
				let adjacentBombs = 0;
				traverseAdjacentCells({
					numRows,
					numColumns,
					row,
					column,
					callback: ({ row, column }: CellLocationPayload) =>
						gameBoard[row][column].isBomb && ++adjacentBombs,
				});
				dispatch(allocateAdjacentBombs({ row, column, adjacentBombs }));
			});
		});

		dispatch(startGame());

		next(action);
	};
}
