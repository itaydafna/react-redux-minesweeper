import { ActionType, getType } from 'typesafe-actions';
import { setDanger } from '../actions';

export type SetDangerAction = ActionType<typeof setDanger>;

const initialState: boolean = false;

/*it is considered "dangerous" when mousedown on unrevealed cell*/
export default function danger(state = initialState, action: SetDangerAction): boolean {
	if (action.type === getType(setDanger)) return action.payload;

	return state;
}
