import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { revealSquare } from './actions';

function App({ squares, revealSquare }) {
	const onSquareClick = ({row, column}) => {
    console.log('clicked:',{row, column});
    !squares[row][column].isRevealed && revealSquare({row, column})
  }
	return (
		<div className="App">
			{squares.map((columns, row) => (
				<div key={row} style={{ display: 'flex' }}>
					{columns.map((square, column) => (
						<div
              key={column}
              onClick={()=>onSquareClick({row,column})}
							style={{
								height: 70,
								width: 70,
								display: 'flex',
								alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
							}}
						>
							{!square.isRevealed && 'hidden'}
							{square.isRevealed && square.isBomb && 'bomb'}
							{square.isRevealed && !square.isBomb && square.adjacentBombs}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

const mapStateToProps = state => ({
	squares: state.gameBoard.squares,
});

const mapDispatchToProps = {
	revealSquare,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
