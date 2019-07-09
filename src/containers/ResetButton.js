import React, { useEffect } from 'react';
import { reset, winGame } from '../actions/index.ts';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FLAG } from '../types/MARK_TYPES';
import GAME_STAGE_TYPES from '../types/GAME_STAGE_TYPES';

function ResetButton({ reset, isGameWon, gameStage, winGame, danger }) {
	useEffect(() => {
		if (isGameWon) winGame();
	}, [isGameWon, winGame]);
	return (
		<button onClick={reset}>
			{!danger && (gameStage === GAME_STAGE_TYPES.PLAY || gameStage === GAME_STAGE_TYPES.BOARD_CONFIG) && '😀'}
			{!danger && gameStage === GAME_STAGE_TYPES.GAME_WON && '😎'}
			{!danger && gameStage === GAME_STAGE_TYPES.GAME_LOST && '😵'}
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
