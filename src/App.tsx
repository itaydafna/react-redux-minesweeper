import React from 'react';
import GameConfig from './containers/GameConfig';
import ResetButton from './containers/ResetButton';
import GameBoard from './containers/GameBoard';
import GamePanel from './containers/GamePanel';
import { connect } from 'react-redux';
import { setDanger } from './actions/index';
import { RootState } from './configureStore';

import './App.css';

type Props = {
	danger: boolean;
	setDanger: (danger: boolean) => void;
};

const App: React.FC<Props> = ({ danger, setDanger }) => {
	const cancelDanger = () => danger && setDanger(false);
	return (
		<div className="App" onMouseUp={e => e.nativeEvent.which === 1 && cancelDanger()} onMouseLeave={cancelDanger}>
			<ResetButton />
			<GameConfig />
			<GameBoard />
			<GamePanel />
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	danger: state.danger,
});

export default connect(
	mapStateToProps,
	{ setDanger }
)(App);
