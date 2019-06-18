import ACTIONS from '../constants/ACTION_TYPES';
import MARK_TYPES from '../constants/MARK_TYPES';
import { setMark, incrementFlags, decrementFlags } from '../actions';

export default function({ getState, dispatch }) {
	return next => action => {
		if (action.type === ACTIONS.MARK_CELL) {
			const {
				gameBoard: { grid },
			} = getState();
			let nextMark = '';
			const { row, column } = action.payload;
			const cell = grid[row][column];
			if (cell.mark === MARK_TYPES.NONE) nextMark = MARK_TYPES.FLAG;
			if (cell.mark === MARK_TYPES.FLAG) nextMark = MARK_TYPES.QUESTION_MARK;
			if (cell.mark === MARK_TYPES.QUESTION_MARK) nextMark = MARK_TYPES.NONE;

			dispatch(setMark({ row, column, mark: nextMark }));
			if (nextMark === MARK_TYPES.FLAG) dispatch(incrementFlags());
			if (nextMark === MARK_TYPES.QUESTION_MARK) dispatch(decrementFlags());
		}

		next(action);
	};
}
