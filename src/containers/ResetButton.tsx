import React, { useEffect } from 'react';
import { reset, winGame } from '../actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FLAG } from '../types/mark-types';
import { BOARD_CONFIG, GAME_LOST, GAME_WON, PLAY } from '../types/game-stage-types';
import { RootState } from '../configureStore';
import { GameStage } from '../types/game-stage-types';

type Props = {
	reset: () => void;
	isGameWon: boolean;
	gameStage: GameStage;
	winGame: () => void;
	danger: boolean;
};

const ResetButton: React.FC<Props> = ({ reset, isGameWon, gameStage, winGame, danger }) => {
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
};

const isGameWonSelector = createSelector(
	(state: RootState) => state.gameBoard,
	(state: RootState) => state.gameStage === PLAY,
	(gameBoard, isPlay) =>
		isPlay &&
		gameBoard.every(row =>
			row.every(cell => (cell.isBomb && cell.mark === FLAG) || (!cell.isBomb && cell.isRevealed))
		)
);

const mapStateToProps = (state: RootState) => ({
	isGameWon: isGameWonSelector(state),
	gameStage: state.gameStage,
	danger: state.danger,
});

const mapDispatchToProps = {
	reset,
	winGame,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetButton);
