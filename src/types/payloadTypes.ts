import { MARK } from './MARK_TYPES';

export interface CellLocationPayload {
	row: number;
	column: number;
}

export interface AllocateAdjacentBombsPayload extends CellLocationPayload {
	adjacentBombs: number;
}

export interface MarkCellPayload extends CellLocationPayload {
	mark: MARK;
}
