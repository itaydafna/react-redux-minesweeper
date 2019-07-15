import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../configureStore';

const StyledStatusPanel = styled.div`
	display: flex;
	flex-direction: column;
`;

const StatusRow = styled.div`
	display: flex;
	align-items: center;
	margin: 3px 0;
`;

type Props = {
	time: number;
	unflaggedBombs: number;
};

const StatusPanel: React.FC<Props> = ({ time, unflaggedBombs }) => {
	return (
		<StyledStatusPanel>
			<StatusRow>
				<div>
					<span role="img" aria-label="Time">
						⏱
					</span>
					<span> :</span>
				</div>
				<span> {time}</span>
			</StatusRow>
			<StatusRow>
				<div>
					<span role="img" aria-label="Bomb">
						💣
					</span>
					<span> :</span>
				</div>
				<span>{unflaggedBombs}</span>
			</StatusRow>
		</StyledStatusPanel>
	);
};

const unflaggedBombsSelector = createSelector(
	(state: RootState) => state.configuration.bombs,
	(state: RootState) => state.flags,
	(bombs, flags) => bombs - flags
);

const mapStateToProps = (state: RootState) => ({
	unflaggedBombs: unflaggedBombsSelector(state),
	time: state.time,
});

export default connect(mapStateToProps)(StatusPanel);
