import React, { useEffect } from 'react';
import { reset, winGame } from '../actions/index.ts';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FLAG } from '../types/mark-types';
import { BOARD_CONFIG, GAME_LOST, GAME_WON, PLAY } from '../types/game-stage-types.ts';

function ResetButton({ reset, isGameWon, gameStage, winGame, danger }) {
	useEffect(() => {
		if (isGameWon) winGame();
	}, [isGameWon, winGame]);
	return (
		<button onClick={reset}>
			{!danger && (gameStage === PLAY || gameStage === BOARD_CONFIG) && '😀'}
			{!danger && gameStage === GAME_WON && '😎'}
			{!danger && gameStage === GAME_LOST && '😵'}
			{danger && '😧'}
		</button>
	);
}

const isGameWonSelector = createSelector(
	state => state.gameBoard.grid,
	state => state.gameBoard.isDirty,
	(grid, isDirty) =>
		isDirty &&
		grid.every(row => row.every(cell => (cell.isBomb && cell.mark === FLAG) || (!cell.isBomb && cell.isRevealed)))
);

const mapStateToProps = state => ({
	isGameWon: isGameWonSelector(state),
	gameStage: state.gameStage,
	danger: state.gameBoard.danger,
});

const mapDispatchToProps = {
	reset,
	winGame,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetButton);
