import { MiddlewareAPI, Dispatch } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { random, flatten } from 'lodash/fp';
import { allocateBomb, revealCell, CellLocationPayload } from '../actions';
import { PLAY } from '../types/game-stage-types';

export type AllocateBombsMiddlewareAction = ActionType<typeof revealCell>;

export default function({ getState, dispatch }: MiddlewareAPI) {
	return (next: Dispatch) => (action: AllocateBombsMiddlewareAction) => {
		const {
			configuration: { bombs, numColumns, numRows },
			gameStage,
		} = getState();
		if (gameStage === PLAY || action.type !== getType(revealCell)) {
			return next(action);
		}

		const bombCandidatePool: CellLocationPayload[] = flatten(
			[...new Array(numRows)].map((_: undefined, row: number): CellLocationPayload[] =>
				[...new Array(numColumns)].map(
					(_: undefined, column: number): CellLocationPayload => ({
						row,
						column,
					})
				)
			)
		)
			//filter out first revealed cell from "bomb-candidates"
			.filter(
				(cell: CellLocationPayload): boolean =>
					!(cell.row === action.payload.row && cell.column === action.payload.column)
			);

		for (let i = 0; i < bombs; i++) {
			const randomCellIndex = random(0, bombCandidatePool.length - 1);
			const randomCell = bombCandidatePool.splice(randomCellIndex, 1)[0];
			dispatch(allocateBomb(randomCell));
		}
		next(action);
	};
}
