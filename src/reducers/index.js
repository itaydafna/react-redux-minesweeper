import { combineReducers } from 'redux';
import configuration from './configuration';
import gameStage from './gameStage.ts';
import time from './time';
import flags from './flags';
import danger from './danger.ts';
import gameBoard from './gameBoard';

export default combineReducers({
	configuration,
	gameStage,
	time,
	flags,
	danger,
	gameBoard,
});
