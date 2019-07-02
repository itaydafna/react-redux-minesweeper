import React, { useEffect } from 'react';
import { reset, winGame } from '../actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import MARK_TYPES from '../constants/MARK_TYPES';
import GAME_STAGE_TYPES from '../constants/GAME_STAGE_TYPES';

function ResetButton({ reset, isGameWon, gameStage, winGame }) {
	useEffect(() => {
		if (isGameWon) winGame();
	}, [isGameWon, winGame]);
	return (
		<button onClick={reset}>
			{(gameStage === GAME_STAGE_TYPES.PLAY || gameStage === GAME_STAGE_TYPES.BOARD_CONFIG) && '😀'}
			{gameStage === GAME_STAGE_TYPES.GAME_WON && '😎'}
			{gameStage === GAME_STAGE_TYPES.GAME_LOST && '😵'}
		</button>
	);
}

const isGameWonSelector = createSelector(
	state => state.gameBoard.grid,
	state => state.gameBoard.isDirty,
	(grid, isDirty) =>
		isDirty &&
		grid.every(row =>
			row.every(cell => (cell.isBomb && cell.mark === MARK_TYPES.FLAG) || (!cell.isBomb && cell.isRevealed))
		)
);

const mapStateToProps = state => ({
	isGameWon: isGameWonSelector(state),
	gameStage: state.gameStage,
});

const mapDispatchToProps = {
	reset,
	winGame,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetButton);
