import React from 'react';
import { reset } from '../actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

function GamePanel({ reset, time, unflaggedBombs }) {
	return (
		<>
			<div>
				<span>⏱: </span> <span>{time}</span>
			</div>
			<div>
				<span>💣: </span> <span>{unflaggedBombs}</span>
			</div>
		</>
	);
}

const unflaggedBombsSelector = createSelector(
	state => state.gameBoard.bombs,
	state => state.gameBoard.flags,
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
