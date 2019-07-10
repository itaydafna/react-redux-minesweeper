import { applyMiddleware, createStore } from 'redux';
import { StateType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import allocateBombs from './middleware/allocateBombs';
import allocateAdjacentBombsCount from './middleware/allocateAdjacentBombsCount';
import revealCell from './middleware/revealCell';
import time from './middleware/time';

import rootReducer from './reducers';

export type RootState = StateType<ReturnType<typeof rootReducer>>;

export default function configureStore() {
	const middlewares = [allocateBombs, allocateAdjacentBombsCount, time, revealCell];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(rootReducer, {}, composedEnhancers);

	return store;
}
