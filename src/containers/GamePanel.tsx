import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../configureStore';

type Props = {
	time: number;
	unflaggedBombs: number;
};

const GamePanel: React.FC<Props> = ({ time, unflaggedBombs }) => {
	return (
		<div>
			<div>
				<span role="img" aria-label="Time">
					⏱
				</span>
				<span> :</span> <span> {time}</span>
			</div>
			<div>
				<span role="img" aria-label="Bomb">
					💣
				</span>
				<span> :</span>
				<span>{unflaggedBombs}</span>
			</div>
		</div>
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

export default connect(mapStateToProps)(GamePanel);
