import React from 'react';
import styled from 'styled-components';
import GameConfig from './containers/GameConfig';
import StatusButton from './containers/StatusButton';
import GameBoard from './containers/GameBoard';
import GamePanel from './containers/GamePanel';
import { connect } from 'react-redux';
import { setDanger } from './actions';
import { RootState } from './configureStore';

import './App.css';

const ToBar = styled.div`
	width: 1110px;
	height: 60px;
	display: inline-flex;
	align-items: center;

	> div {
		flex: 1;

		&:nth-child(2) {
			display: flex;
			justify-content: center;
		}
	}
`;

type Props = {
	danger: boolean;
	setDanger: (danger: boolean) => void;
};

const App: React.FC<Props> = ({ danger, setDanger }) => {
	const cancelDanger = () => danger && setDanger(false);
	return (
		<div className="App" onMouseUp={e => e.nativeEvent.which === 1 && cancelDanger()} onMouseLeave={cancelDanger}>
			<ToBar>
				<div>
					<GamePanel />
				</div>
				<div>
					<StatusButton />
				</div>
				<div>
					<GameConfig />
				</div>
			</ToBar>
			<div>
				<GameBoard />
			</div>
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
