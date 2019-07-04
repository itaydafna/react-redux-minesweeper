import React from 'react';
import GameConfig from './containers/GameConfig';
import ResetButton from './containers/ResetButton';
import GameBoard from './containers/GameBoard.tsx';
import GamePanel from './containers/GamePanel';
import { connect } from 'react-redux';
import { setDanger } from './actions';

import './App.css';

function App({ danger, setDanger }) {
	const cancelDanger = () => danger && setDanger(false);
	return (
		<div className="App" onMouseUp={e => e.nativeEvent.which === 1 && cancelDanger()} onMouseLeave={cancelDanger}>
			<ResetButton />
			<GameConfig />
			<GameBoard />
			<GamePanel />
		</div>
	);
}

const mapStateToProps = state => ({
	danger: state.gameBoard.danger,
});

export default connect(
	mapStateToProps,
	{ setDanger }
)(App);
