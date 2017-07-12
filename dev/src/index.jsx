import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './app.jsx';
import { $dw } from './data-worker';

const store = initStore();

ReactDOM.render(
    <Provider
        store={store}
    >
        <App />
    </Provider>,
    document.getElementById('root')
);

function initStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState
    );

    /*if(module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer)
        })
    }*/

    return store
}