import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import allocateBombs from './middleware/allocateBombs';
import allocateAdjacentBombsCount from './middleware/allocateAdjacentBombsCount';
import revealCell from './middleware/revealCell';
import time from './middleware/time';

import rootReducer from './reducers/index';

export default function configureStore(preloadedState) {
	const middlewares = [allocateBombs, allocateAdjacentBombsCount, time, revealCell];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(rootReducer, preloadedState, composedEnhancers);

	return store;
}
