import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

const mapStateToProps = (state: RootState) => ({
	numRows: state.configuration.numRows,
	numColumns: state.configuration.numColumns,
});

export default connect(mapStateToProps)(GameBoard);
