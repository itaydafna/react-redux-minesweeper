import React from 'react';
import styled from 'styled-components';
import { FLAG, QUESTION_MARK, NONE } from '../types/mark-types';
import { connect } from 'react-redux';
import { revealCell, markCell, setDanger, incrementFlags, decrementFlags } from '../actions/index.ts';

const StyledCell = styled.div`
	height: 40px;
	width: 40px;
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

function setNextMark(currentMark) {
	if (currentMark === NONE) return FLAG;
	if (currentMark === FLAG) return QUESTION_MARK;
	if (currentMark === QUESTION_MARK) return NONE;
}

function Cell({ cell, row, column, revealCell, markCell, setDanger, incrementFlags, decrementFlags }) {
	const onCellClick = () => {
		!cell.isRevealed && revealCell({ row, column });
	};

	const onCellRightClick = () => {
		if (cell.isRevealed) return;
		const nextMark = setNextMark(cell.mark);
		markCell({ row, column, mark: nextMark });
		if (nextMark === FLAG) incrementFlags();
		if (nextMark === QUESTION_MARK) decrementFlags();
	};

	const onCellMouseDown = e => e.nativeEvent.which === 1 && setDanger(true);
	return (
		<StyledCell
			onClick={onCellClick}
			onContextMenu={event => event.preventDefault() || onCellRightClick()}
			onMouseDown={onCellMouseDown}
		>
			{!cell.isRevealed && ''}
			{cell.isRevealed && cell.isBomb && '💣'}
			{cell.isRevealed && !cell.isBomb && cell.adjacentBombs}
			{!cell.isRevealed && cell.mark === FLAG && '🚩'}
			{!cell.isRevealed && cell.mark === QUESTION_MARK && '?'}
		</StyledCell>
	);
}

const mapStateToProps = (state, { row, column }) => ({
	cell: state.gameBoard.grid[row][column],
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
