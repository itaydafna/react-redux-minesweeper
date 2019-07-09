import { combineReducers } from 'redux';
import gameBoard from './gameBoard';
import gameStage from './gameStage.ts';
import time from './time';
import danger from './danger.ts';

export default combineReducers({ gameBoard, gameStage, time, danger });
