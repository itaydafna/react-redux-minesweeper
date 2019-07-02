import React from 'react';
import { connect } from 'react-redux';
import { revealCell, markCell } from '../actions';
import Cell from '../components/Cell';

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
				<Cell
					key={column}
					cell={cell}
					onCellClick={() => onCellClick({ row, column })}
					onCellRightClick={() => onCellRightClick({ row, column })}
				/>
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
