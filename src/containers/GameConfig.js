import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { configGameBoard } from '../actions/index.ts';
import GAME_STAGE_TYPES from '../types/GAME_STAGE_TYPES';

function GameConfig({ gameStage, rows: r, columns: c, bombs: b, configGameBoard }) {
	const onBoardConfig = useCallback(
		({ rows = r, columns = c, bombs = b } = {}) => configGameBoard({ rows, columns, bombs }),
		[b, c, configGameBoard, r]
	);

	useEffect(() => {
		onBoardConfig();
	}, [onBoardConfig]);

	return (
		gameStage === GAME_STAGE_TYPES.BOARD_CONFIG && (
			<div>
				<div>
					<label htmlFor="rows">Rows:</label>
					<input
						id="rows"
						type="number"
						value={r}
						min={2}
						onChange={({ target: { value } }) => onBoardConfig({ rows: Number(value) })}
					/>
				</div>
				<div>
					<label htmlFor="columns">Columns:</label>
					<input
						id="columns"
						type="number"
						value={c}
						min={2}
						onChange={({ target: { value } }) => onBoardConfig({ columns: Number(value) })}
					/>
				</div>
				<div>
					<label htmlFor="bombs">Bombs:</label>
					<input
						id="bombs"
						type="number"
						value={b}
						min={1}
						max={c * r}
						onChange={({ target: { value } }) => onBoardConfig({ bombs: Number(value) })}
					/>
				</div>
			</div>
		)
	);
}

const mapStateToProps = state => ({
	gameStage: state.gameStage,
	rows: state.gameBoard.rows,
	columns: state.gameBoard.columns,
	bombs: state.gameBoard.bombs,
});

const mapDispatchToProps = {
	configGameBoard,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameConfig);
