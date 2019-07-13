import React from 'react';
import styled, { css } from 'styled-components';
import { FLAG, QUESTION_MARK, NONE, MARK } from '../types/mark-types';
import { connect } from 'react-redux';
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

const cellBaseStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35px;
	width: 35px;
	margin: 1px;
	font-size: 1rem;
	background-color: #c0c0c0;
`;

const HiddenCell = styled.button`
	${cellBaseStyle};
	cursor: pointer;
	border: 1.5px solid;
	border-top-color: #ffffff;
	border-right-color: #7b7b7b;
	border-bottom-color: #7b7b7b;
	border-left-color: #ffffff;
	outline: none;

	&:active {
		${({ mark }: { mark: MARK }) => mark === NONE && 'border-width: 0.5px'};
	}
`;

const RevealedCell = styled.div`
	${cellBaseStyle};
`;

function setNextMark(currentMark: MARK): MARK {
	if (currentMark === NONE) return FLAG;
	if (currentMark === FLAG) return QUESTION_MARK;
	return NONE;
}

type Props = {
	cell: CellState;
	row: number;
	column: number;
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
		if (cell.isRevealed) return;
		const nextMark = setNextMark(cell.mark);
		markCell({ row, column, mark: nextMark });
		if (nextMark === FLAG) incrementFlags();
		if (nextMark === QUESTION_MARK) decrementFlags();
	};

	const onCellMouseDown = (event: React.MouseEvent) => event.nativeEvent.which === 1 && setDanger(true);
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
