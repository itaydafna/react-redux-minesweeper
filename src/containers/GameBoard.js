import React from 'react';
import { connect } from 'react-redux';
import { revealCell, markCell, setDanger } from '../actions';
import Cell from '../components/Cell';

function GameBoard({ grid, revealCell, markCell, setDanger }) {
	const onCellClick = ({ row, column }) => {
		!grid[row][column].isRevealed && revealCell({ row, column });
	};

	const onCellRightClick = ({ row, column }) => {
		!grid[row][column].isRevealed && markCell({ row, column });
	};

	const onCellMouseDown = e => e.nativeEvent.which === 1 && setDanger(true);

	return grid.map((columns, row) => (
		<div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
			{columns.map((cell, column) => (
				<Cell
					key={column}
					cell={cell}
					onCellClick={() => onCellClick({ row, column })}
					onCellRightClick={() => onCellRightClick({ row, column })}
					onCellMouseDown={onCellMouseDown}
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
	setDanger,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameBoard);
