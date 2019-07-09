import React from 'react';
import { reset } from '../actions/index.ts';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

function GamePanel({ reset, time, unflaggedBombs }) {
	return (
		<>
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
		</>
	);
}

const unflaggedBombsSelector = createSelector(
	state => state.configuration.bombs,
	state => state.flags,
	(bombs, flags) => bombs - flags
);

const mapStateToProps = state => ({
	unflaggedBombs: unflaggedBombsSelector(state),
	time: state.time,
});

const mapDispatchToProps = {
	reset,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GamePanel);
