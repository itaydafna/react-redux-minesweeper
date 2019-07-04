import React from 'react';
import styled from 'styled-components';
import MARK_TYPES from '../constants/MARK_TYPES';
import { connect } from 'react-redux';
import { revealCell, markCell, setDanger } from '../actions';

const StyledCell = styled.div`
	height: 40px;
	width: 40px;
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

function Cell({ cell, row, column, revealCell, markCell, setDanger }) {
	const onCellClick = () => {
		!cell.isRevealed && revealCell({ row, column });
	};

	const onCellRightClick = () => {
		!cell.isRevealed && markCell({ row, column });
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
			{!cell.isRevealed && cell.mark === MARK_TYPES.FLAG && '🚩'}
			{!cell.isRevealed && cell.mark === MARK_TYPES.QUESTION_MARK && '?'}
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
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cell);
