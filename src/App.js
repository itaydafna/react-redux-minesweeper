import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { revealCell, markCell, configGameBoard, reset } from './actions';
import MARK_TYPES from './constants/MARK_TYPES';
import GAME_STAGE_TYPES from './constants/GAME_STAGE_TYPES';

function App({ grid, revealCell, markCell, gameStage, rows: r, columns: c, bombs: b, configGameBoard, reset }) {
	const onCellClick = ({ row, column }) => {
		!grid[row][column].isRevealed && revealCell({ row, column });
	};

	const onCellRightClick = ({ row, column }) => {
		!grid[row][column].isRevealed && markCell({ row, column });
	};

	const onBoardConfig = useCallback(
		({ rows = r, columns = c, bombs = b } = {}) => configGameBoard({ rows, columns, bombs }),
		[b, c, configGameBoard, r]
	);

	useEffect(() => {
		onBoardConfig();
	}, [onBoardConfig]);

	return (
		<div className="App">
			{gameStage === GAME_STAGE_TYPES.BOARD_CONFIG && (
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
			)}
			{grid.map((columns, row) => (
				<div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
					{columns.map((cell, column) => (
						<div
							key={column}
							onClick={() => onCellClick({ row, column })}
							onContextMenu={event => event.preventDefault() || onCellRightClick({ row, column })}
							style={{
								height: 40,
								width: 40,
								border: '1px solid black',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
						>
							{!cell.isRevealed && ''}
							{cell.isRevealed && cell.isBomb && '💣'}
							{cell.isRevealed && !cell.isBomb && cell.adjacentBombs}
							{!cell.isRevealed && cell.mark === MARK_TYPES.FLAG && '🚩'}
							{!cell.isRevealed && cell.mark === MARK_TYPES.QUESTION_MARK && '?'}
						</div>
					))}
				</div>
			))}
			{gameStage === GAME_STAGE_TYPES.GAME_OVER && (
				<div>
					<button onClick={reset}>RESET</button>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = state => ({
	grid: state.gameBoard.grid,
	gameStage: state.gameStage,
	rows: state.gameBoard.rows,
	columns: state.gameBoard.columns,
	bombs: state.gameBoard.bombs,
});

const mapDispatchToProps = {
	revealCell,
	markCell,
	configGameBoard,
	reset,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
