import React from 'react';
import { connect } from 'react-redux';
import { revealCell, markCell } from '../actions';
import MARK_TYPES from '../constants/MARK_TYPES';

function GameBoard({ grid, revealCell, markCell }) {
	const onCellClick = ({ row, column }) => {
		!grid[row][column].isRevealed && revealCell({ row, column });
	};

	const onCellRightClick = ({ row, column }) => {
		!grid[row][column].isRevealed && markCell({ row, column });
	};

	return grid.map((columns, row) => (
		<div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
			{columns.map((cell, column) => (
				<div
					key={column}
					onClick={() => onCellClick({ row, column })}
					onContextMenu={event => event.preventDefault() || onCellRightClick({ row, column })}
					style={{
						height: 40,
						width: 40,
						border: '1px solid black',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
				>
					{!cell.isRevealed && ''}
					{cell.isRevealed && cell.isBomb && '💣'}
					{cell.isRevealed && !cell.isBomb && cell.adjacentBombs}
					{!cell.isRevealed && cell.mark === MARK_TYPES.FLAG && '🚩'}
					{!cell.isRevealed && cell.mark === MARK_TYPES.QUESTION_MARK && '?'}
				</div>
			))}
		</div>
	));
}

const mapStateToProps = state => ({
	grid: state.gameBoard.grid,
});

const mapDispatchToProps = {
	revealCell,
	markCell,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameBoard);
