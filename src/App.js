import React from 'react';
import GameConfig from './containers/GameConfig';
import ResetButton from './containers/ResetButton';
import GameBoard from './containers/GameBoard';
import GamePanel from './containers/GamePanel';

import './App.css';

export default function App() {
	return (
		<div className="App">
			<ResetButton />
			<GameConfig />
			<GameBoard />
			<GamePanel />
		</div>
	);
}
