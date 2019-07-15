import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CustomConfig from './CustomConfig';
import { configGameBoard } from '../actions/index';
import { BOARD_CONFIG } from '../types/game-stage-types';
import { RootState } from '../configureStore';
import { GameStage } from '../types/game-stage-types';
import { ConfigurationState, gameProfiles } from '../reducers/configuration';
import { ConfigOptionButton } from '../components/CellThemes';

const StyledGameConfigPanel = styled.div`
	position: relative;
	background: #e0d6d6;
	display: inline-flex;
`;

const CustomConfigDropDown = styled.div`
	position: absolute;
	background: #e0d6d6;
	top: 100%;
	right: 0;
	width: 400px;
	padding: 15px;
	opacity: 0.9;
	box-shadow: 2px 2px 3px gray;
`;

function useProfileSelection(initialProfileId: string) {
	const [gameProfile, setGameProfile] = useState(initialProfileId);

	function selectProfile(profileId: string, onProfileSelect?: (configuration: ConfigurationState) => void) {
		setGameProfile(profileId);
		onProfileSelect && onProfileSelect(gameProfiles[profileId].configuration);
	}

	return {
		gameProfile,
		selectProfile,
	};
}

function useCustomConfigDropdown() {
	const [customConfigDropdownOpen, setCustomConfigDropdownOpen] = useState(false);
	const customConfigDropdownRef = useRef<HTMLDivElement>(null);
	const handleClick = (event: MouseEvent) => {
		if (customConfigDropdownRef.current && customConfigDropdownRef.current.contains(event.target as Node)) {
			return;
		}
		setCustomConfigDropdownOpen(false);
	};

	useEffect(() => {
		// add when mounted
		document.addEventListener('click', handleClick);
		// return function to be called when unmounted
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	return { customConfigDropdownOpen, setCustomConfigDropdownOpen, customConfigDropdownRef };
}

type Props = {
	gameStage: GameStage;
	configGameBoard: (configuration: ConfigurationState) => void;
};

const GameConfigPanel: React.FC<Props> = ({ gameStage, configGameBoard }) => {
	const { gameProfile, selectProfile } = useProfileSelection(gameProfiles.beginner.id);
	const {
		customConfigDropdownOpen,
		setCustomConfigDropdownOpen,
		customConfigDropdownRef,
	} = useCustomConfigDropdown();

	if (gameStage !== BOARD_CONFIG) return null;

	return (
		<StyledGameConfigPanel>
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
			<ConfigOptionButton
				isSelected={gameProfile === 'custom'}
				onClick={(event: React.MouseEvent) => {
					event.preventDefault();
					event.stopPropagation();
					event.nativeEvent.stopImmediatePropagation();
					selectProfile('custom');
					setCustomConfigDropdownOpen(isOpen => !isOpen);
				}}
			>
				<span role="img" aria-label="Wrench">
					🔧
				</span>
			</ConfigOptionButton>
			{gameProfile === 'custom' && customConfigDropdownOpen && (
				<CustomConfigDropDown ref={customConfigDropdownRef}>
					<CustomConfig />
				</CustomConfigDropDown>
			)}
		</StyledGameConfigPanel>
	);
};

const mapStateToProps = (state: RootState) => ({
	gameStage: state.gameStage,
});

const mapDispatchToProps = {
	configGameBoard,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameConfigPanel);
