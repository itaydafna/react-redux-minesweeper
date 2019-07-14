import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { configGameBoard } from '../actions/index';
import { BOARD_CONFIG } from '../types/game-stage-types';
import { RootState } from '../configureStore';
import { GameStage } from '../types/game-stage-types';
import { ConfigurationState, gameProfiles } from '../reducers/configuration';
import { ConfigOptionButton } from '../components/CellThemes';

function useProfileSelection(initialProfileId: string) {
	const [gameProfile, setGameProfile] = useState(initialProfileId);

	function selectProfile(profileId: string, onProfileSelect: (configuration: ConfigurationState) => void) {
		setGameProfile(profileId);
		onProfileSelect(gameProfiles[profileId].configuration);
	}

	return {
		gameProfile,
		selectProfile,
	};
}

const GameConfigPanel = styled.div`
	display: inline-flex;
`;

type Props = {
	gameStage: GameStage;
	numRows: number;
	numColumns: number;
	bombs: number;
	configGameBoard: (configuration: ConfigurationState) => void;
};

const GameConfig: React.FC<Props> = ({ gameStage, numRows, numColumns, bombs, configGameBoard }) => {
	// const onBoardConfig = useCallback(
	// 	({ numRows, numColumns, bombs }: ConfigurationState) => configGameBoard({ numRows, numColumns, bombs }),
	// 	[configGameBoard]
	// );

	const { gameProfile, selectProfile } = useProfileSelection(gameProfiles.beginner.id);

	if (gameStage !== BOARD_CONFIG) return null;

	return (
		<GameConfigPanel>
			<ConfigOptionButton
				isSelected={gameProfile === gameProfiles.beginner.id}
				onClick={() => selectProfile(gameProfiles.beginner.id, configGameBoard)}
			>
				<span role="img" aria-label="Baby">
					👶
				</span>
			</ConfigOptionButton>
			<ConfigOptionButton
				isSelected={gameProfile === gameProfiles.intermediate.id}
				onClick={() => selectProfile(gameProfiles.intermediate.id, configGameBoard)}
			>
				<span role="img" aria-label="Man Construction Worker">
					👷‍♂️
				</span>
			</ConfigOptionButton>
			<ConfigOptionButton
				isSelected={gameProfile === gameProfiles.expert.id}
				onClick={() => selectProfile(gameProfiles.expert.id, configGameBoard)}
			>
				<span role="img" aria-label="Man Superhero">
					🦸‍♂️
				</span>
			</ConfigOptionButton>
		</GameConfigPanel>
	);
	// 	<div>
	// 		<div>
	// 			<label htmlFor="rows">Rows:</label>
	// 			<input
	// 				id="rows"
	// 				type="number"
	// 				value={numRows}
	// 				min={2}
	// 				onChange={({ target: { value } }) => onBoardConfig({ numRows: Number(value), numColumns, bombs })}
	// 			/>
	// 		</div>
	// 		<div>
	// 			<label htmlFor="columns">Columns:</label>
	// 			<input
	// 				id="columns"
	// 				type="number"
	// 				value={numColumns}
	// 				min={2}
	// 				onChange={({ target: { value } }) => onBoardConfig({ numRows, numColumns: Number(value), bombs })}
	// 			/>
	// 		</div>
	// 		<div>
	// 			<label htmlFor="bombs">Bombs:</label>
	// 			<input
	// 				id="bombs"
	// 				type="number"
	// 				value={bombs}
	// 				min={1}
	// 				max={numColumns * numRows}
	// 				onChange={({ target: { value } }) => onBoardConfig({ numRows, numColumns, bombs: Number(value) })}
	// 			/>
	// 		</div>
	// 	</div>
	// );
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
