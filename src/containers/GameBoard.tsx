import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../configureStore';
import Cell from './Cell';

const StyledGameBoard = styled.div`
	display: inline-block;
	background: #d3d3d3;
	padding: 2px;
`;

const StyledRow = styled.div`
	display: flex;
	justify-content: center;
`;

type Props = {
	numRows: number;
	numColumns: number;
};

const GameBoard: React.FC<Props> = ({ numRows, numColumns }) => {
	console.log(numRows);
	return (
		<StyledGameBoard>
			{[...new Array(numRows)].map((_, row) => (
				<StyledRow key={row}>
					{[...new Array(numColumns)].map((_, column) => (
						<Cell key={column} row={row} column={column} />
					))}
				</StyledRow>
			))}
		</StyledGameBoard>
	);
};

const gameBoardSelector = (state: RootState) => state.gameBoard;

const numRowsSelector = createSelector(
	gameBoardSelector,
	gameBoard => gameBoard.length
);

const numColumnsSelector = createSelector(
	gameBoardSelector,
	gameBoard => gameBoard[0] && gameBoard[0].length
);

const mapStateToProps = (state: RootState) => ({
	numRows: numRowsSelector(state),
	numColumns: numColumnsSelector(state),
});

export default connect(mapStateToProps)(GameBoard);
