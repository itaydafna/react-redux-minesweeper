import { combineReducers } from 'redux';
import configuration from './configuration';
import gameStage from './gameStage';
import time from './time';
import flags from './flags';
import danger from './danger';
import gameBoard from './gameBoard';

export default combineReducers({
	configuration,
	gameStage,
	time,
	flags,
	danger,
	gameBoard,
});
