import { MiddlewareAPI, Dispatch } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { CellState } from './../reducers/cell';
import { revealCell, loseGame, CellLocationPayload } from '../actions';
import traverseAdjacentCells from '../services/traverseAdjacentCells';

const revealCellMiddlewareActions = { revealCell, loseGame };

export type RevealCellMiddlewareAction = ActionType<typeof revealCellMiddlewareActions>;

export default function({ getState, dispatch }: MiddlewareAPI) {
	return (next: Dispatch) => (action: RevealCellMiddlewareAction) => {
		const {
			gameBoard,
			configuration: { numRows, numColumns },
		} = getState();

		if (action.type !== getType(revealCell)) {
			return next(action);
		}

		const { row, column } = action.payload;
		const cell: CellState = gameBoard[row][column];

		//if bomb is revealed reveal all grid (game over)
		if (cell.isBomb) {
			return dispatch(loseGame());
		}
		//if empty cell is revealed  - start "chain reaction" - revealing all adjacent unrevealed none-bomb grid
		if (!cell.adjacentBombs) {
			next(action);
			traverseAdjacentCells({
				numRows,
				numColumns,
				row,
				column,
				callback: ({ row, column }: CellLocationPayload) => {
					const { gameBoard } = getState();
					!gameBoard[row][column].isBomb &&
						!gameBoard[row][column].isRevealed &&
						dispatch(revealCell({ row, column }));
				},
			});
			return;
		}

		next(action);
	};
}
