import * as ACTIONS from '../types/ACTION_TYPES.ts';
import { FLAG, QUESTION_MARK, NONE } from '../types/MARK_TYPES';
import { setMark, incrementFlags, decrementFlags } from '../actions/index.ts';

export default function({ getState, dispatch }) {
	return next => action => {
		if (action.type === ACTIONS.MARK_CELL) {
			const {
				gameBoard: { grid },
			} = getState();
			let nextMark = '';
			const { row, column } = action.payload;
			const cell = grid[row][column];
			if (cell.mark === NONE) nextMark = FLAG;
			if (cell.mark === FLAG) nextMark = QUESTION_MARK;
			if (cell.mark === QUESTION_MARK) nextMark = NONE;

			dispatch(setMark({ row, column, mark: nextMark }));
			if (nextMark === FLAG) dispatch(incrementFlags());
			if (nextMark === QUESTION_MARK) dispatch(decrementFlags());
		}

		next(action);
	};
}
