import InputRange from 'react-input-range';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { configGameBoard } from '../actions/index';
import { RootState } from '../configureStore';
import { ConfigurationState } from '../reducers/configuration';

import 'react-input-range/lib/css/index.css';

const CustomConfigInputWrapper = styled.div`
	margin: 15px 0;
	text-align: left;

	> label {
		display: inline-block;
		margin: 10px 0;
	}

	> div {
		.input-range__label {
			color: black;
			font-weight: bold;
		}
	}
`;

type Props = {
	numRows: number;
	numColumns: number;
	bombs: number;
	configGameBoard: (configuration: ConfigurationState) => void;
};

const CustomConfig: React.FC<Props> = ({ numRows, numColumns, bombs, configGameBoard }) => {
	const maxBombs = numRows * numColumns - 1;

	useEffect(() => {
		if (bombs >= maxBombs + 1) {
			configGameBoard({ numRows, numColumns, bombs: maxBombs });
		}
	}, [maxBombs, configGameBoard, bombs, numColumns, numRows]);

	const onBoardConfig = useCallback(
		({ numRows, numColumns, bombs }: ConfigurationState) => configGameBoard({ numRows, numColumns, bombs }),
		[configGameBoard]
	);

	return (
		<>
			<CustomConfigInputWrapper>
				<label htmlFor="rows">Rows:</label>
				<div>
					<InputRange
						allowSameValues
						value={numRows}
						maxValue={17}
						minValue={1}
						onChange={value => onBoardConfig({ numRows: Number(value), numColumns, bombs })}
					/>
				</div>
			</CustomConfigInputWrapper>
			<CustomConfigInputWrapper>
				<label htmlFor="rows">Columns:</label>
				<div>
					<InputRange
						allowSameValues
						value={numColumns}
						maxValue={34}
						minValue={1}
						onChange={value => onBoardConfig({ numRows, numColumns: Number(value), bombs })}
					/>
				</div>
			</CustomConfigInputWrapper>
			<CustomConfigInputWrapper>
				<label htmlFor="rows">
					<span role="img" aria-label="Bomb">
						💣
					</span>
					:
				</label>
				<div>
					<InputRange
						allowSameValues
						value={bombs}
						maxValue={maxBombs}
						minValue={0}
						onChange={value => onBoardConfig({ numRows, numColumns, bombs: Number(value) })}
					/>
				</div>
			</CustomConfigInputWrapper>
		</>
	);
};

const mapStateToProps = (state: RootState) => ({
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
)(CustomConfig);
