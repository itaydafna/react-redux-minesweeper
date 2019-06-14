import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { revealCell } from './actions';

function App({ grid, revealCell }) {
	const onCellClick = ({row, column}) => {
    console.log('clicked:',{row, column});
    !grid[row][column].isRevealed && revealCell({row, column})
  }
	return (
		<div className="App">
			{grid.map((columns, row) => (
				<div key={row} style={{ display: 'flex' }}>
					{columns.map((cell, column) => (
						<div
              key={column}
              onClick={()=>onCellClick({row,column})}
							style={{
								height: 70,
								width: 70,
								display: 'flex',
								alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
							}}
						>
							{!cell.isRevealed && 'hidden'}
							{cell.isRevealed && cell.isBomb && 'bomb'}
							{cell.isRevealed && !cell.isBomb && cell.adjacentBombs}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

const mapStateToProps = state => ({
	grid: state.gameBoard.grid,
});

const mapDispatchToProps = {
	revealCell,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
