import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Cell from './Cell';

const StyledRow = styled.div`
	display: flex;
	justify-content: center;
`;

function GameBoard({ numRows, numColumns }) {
	return [...new Array(numRows)].map((_, row) => (
		<StyledRow key={row}>
			{[...new Array(numColumns)].map((_, column) => (
				<Cell key={column} row={row} column={column} />
			))}
		</StyledRow>
	));
}

const gameBoardSelector = state => state.gameBoard;

const numRowsSelector = createSelector(
	gameBoardSelector,
	gameBoard => gameBoard.length
);

const numColumnsSelector = createSelector(
	gameBoardSelector,
	gameBoard => gameBoard[0] && gameBoard[0].length
);

const mapStateToProps = state => ({
	numRows: numRowsSelector(state),
	numColumns: numColumnsSelector(state),
});

export default connect(mapStateToProps)(GameBoard);
