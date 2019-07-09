import { combineReducers } from 'redux';
import configuration from './configuration';
import gameBoard from './gameBoard';
import gameStage from './gameStage.ts';
import time from './time';
import danger from './danger.ts';

export default combineReducers({ configuration, gameBoard, gameStage, time, danger });
