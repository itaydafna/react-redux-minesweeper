import ACTIONS from '../actions';
import square from './square';

const initialState = {
	isFirstRevealed: false,
	columns: 0,
	rows: 0,
	bombs: 0,
	squares: [],
};

export default function gameBoard(state = initialState, action) {
	switch (action.type) {
		case ACTIONS.INIT_GAME_BOARD:
			return {
				...state,
				columns: action.payload.columns,
				rows: action.payload.rows,
				bombs: action.payload.bombs,
				squares: [...new Array(action.payload.rows)].map(row => [...new Array(action.payload.columns)].map(col => square(undefined, action))),
      };
      
		case ACTIONS.ALLOCATE_BOMB:
			return {
				...state,
				squares: [
					...state.squares.slice(0, action.payload.row),
					[
						...state.squares[action.payload.row].slice(0, action.payload.column),
						square(state.squares[action.payload.row][action.payload.column], action),
						...state.squares[action.payload.row].slice(action.payload.column + 1),
					],
					...state.squares.slice(action.payload.row + 1),
				]
      };
      case ACTIONS.REVEAL_SQUARE:
          return {
            ...state,
            squares: [
              ...state.squares.slice(0, action.payload.row),
              [
                ...state.squares[action.payload.row].slice(0, action.payload.column),
                square(state.squares[action.payload.row][action.payload.column], action),
                ...state.squares[action.payload.row].slice(action.payload.column + 1),
              ],
              ...state.squares.slice(action.payload.row + 1),
            ]
          };

		default:
			return state;
	}
}
