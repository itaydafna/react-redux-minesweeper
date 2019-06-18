import { combineReducers } from 'redux';
import gameBoard from './gameBoard';
import gameStage from './gameStage';

export default combineReducers({ gameBoard, gameStage });
