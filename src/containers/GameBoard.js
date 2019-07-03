import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Cell from './Cell';

function GameBoard({ numRows, numColumns }) {
	return [...new Array(numRows)].map((_, row) => (
		<div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
			{[...new Array(numColumns)].map((_, column) => (
				<Cell key={column} row={row} column={column} />
			))}
		</div>
	));
}

const gridSelector = state => state.gameBoard.grid;

const numRowsSelector = createSelector(
	gridSelector,
	grid => grid.length
);

const numColumnsSelector = createSelector(
	gridSelector,
	grid => grid[0] && grid[0].length
);

const mapStateToProps = state => ({
	numRows: numRowsSelector(state),
	numColumns: numColumnsSelector(state),
});

export default connect(mapStateToProps)(GameBoard);
