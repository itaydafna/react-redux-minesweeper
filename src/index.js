import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';

import {initGameBoard, revealSquare} from './actions'

const store = configureStore();

store.dispatch(initGameBoard({rows: 3, columns: 3, bombs:4 }));
store.dispatch(revealSquare({row: 1, column: 0}));


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
