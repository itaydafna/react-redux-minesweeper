import React from 'react';
import { connect } from 'react-redux';
import { FLAG, QUESTION_MARK, NONE, MARK } from '../types/mark-types';
import { PLAY, GameStage } from '../types/game-stage-types';
import {
	revealCell,
	markCell,
	setDanger,
	incrementFlags,
	decrementFlags,
	CellLocationPayload,
	MarkCellPayload,
} from '../actions';
import { RootState } from '../configureStore';
import { CellState } from '../reducers/cell';
import { HiddenCell, RevealedCell } from '../components/CellThemes';

function setNextMark(currentMark: MARK): MARK {
	if (currentMark === NONE) return FLAG;
	if (currentMark === FLAG) return QUESTION_MARK;
	return NONE;
}

type Props = {
	cell: CellState;
	row: number;
	column: number;
	gameStage: GameStage;
	revealCell: (payload: CellLocationPayload) => void;
	markCell: (payload: MarkCellPayload) => void;
	setDanger: (danger: boolean) => void;
	incrementFlags: () => void;
	decrementFlags: () => void;
};

const Cell: React.FC<Props> = ({
	cell,
	row,
	column,
	gameStage,
	revealCell,
	markCell,
	setDanger,
	incrementFlags,
	decrementFlags,
}) => {
	const onCellClick = () => {
		!cell.isRevealed && cell.mark === NONE && revealCell({ row, column });
	};

	const onCellRightClick = (event: React.MouseEvent) => {
		event.preventDefault();
		if (gameStage !== PLAY || cell.isRevealed) return;
		const nextMark = setNextMark(cell.mark);
		markCell({ row, column, mark: nextMark });
		if (nextMark === FLAG) incrementFlags();
		if (nextMark === QUESTION_MARK) decrementFlags();
	};

	const onCellMouseDown = (event: React.MouseEvent) =>
		event.nativeEvent.which === 1 && cell.mark === NONE && setDanger(true);
	return (
		<>
			{!cell.isRevealed && (
				<HiddenCell
					onClick={onCellClick}
					onContextMenu={onCellRightClick}
					onMouseDown={onCellMouseDown}
					mark={cell.mark}
				>
					{!cell.isRevealed && cell.mark === FLAG && '🚩'}
					{!cell.isRevealed && cell.mark === QUESTION_MARK && '?'}
				</HiddenCell>
			)}
			{cell.isRevealed && (
				<RevealedCell>
					{cell.isRevealed && cell.isBomb && '💣'}
					{cell.isRevealed && !!cell.adjacentBombs && cell.adjacentBombs}
				</RevealedCell>
			)}
		</>
	);
};

const mapStateToProps = (state: RootState, { row, column }: CellLocationPayload) => ({
	cell: state.gameBoard[row][column],
	gameStage: state.gameStage,
});

const mapDispatchToProps = {
	revealCell,
	markCell,
	setDanger,
	incrementFlags,
	decrementFlags,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cell);
