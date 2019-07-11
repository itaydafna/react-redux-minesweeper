import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { configGameBoard } from '../actions/index';
import { BOARD_CONFIG } from '../types/game-stage-types';
import { RootState } from '../configureStore';
import { GameStage } from '../types/game-stage-types';
import { ConfigurationState } from '../reducers/configuration';

type Props = {
	gameStage: GameStage;
	numRows: number;
	numColumns: number;
	bombs: number;
	configGameBoard: (configuration: ConfigurationState) => void;
};

const GameConfig: React.FC<Props> = ({ gameStage, numRows: r, numColumns: c, bombs: b, configGameBoard }) => {
	const onBoardConfig = useCallback(
		({ numRows = r, numColumns = c, bombs = b } = {}) => configGameBoard({ numRows, numColumns, bombs }),
		[b, c, configGameBoard, r]
	);

	useEffect(() => {
		onBoardConfig();
	}, [onBoardConfig]);

	if (gameStage !== BOARD_CONFIG) return null;

	return (
		<div>
			<div>
				<label htmlFor="rows">Rows:</label>
				<input
					id="rows"
					type="number"
					value={r}
					min={2}
					onChange={({ target: { value } }) => onBoardConfig({ numRows: Number(value) })}
				/>
			</div>
			<div>
				<label htmlFor="columns">Columns:</label>
				<input
					id="columns"
					type="number"
					value={c}
					min={2}
					onChange={({ target: { value } }) => onBoardConfig({ numColumns: Number(value) })}
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
	);
};

const mapStateToProps = (state: RootState) => ({
	gameStage: state.gameStage,
	numRows: state.configuration.numRows,
	numColumns: state.configuration.numColumns,
	bombs: state.configuration.bombs,
});

const mapDispatchToProps = {
	configGameBoard,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameConfig);
