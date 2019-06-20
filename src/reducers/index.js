import { combineReducers } from 'redux';
import gameBoard from './gameBoard';
import gameStage from './gameStage';
import time from './time';

export default combineReducers({ gameBoard, gameStage, time });
