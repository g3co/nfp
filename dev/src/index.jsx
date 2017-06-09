import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import initStore from './initStore.jsx';
import App from './app.jsx';

const store = initStore();

ReactDOM.render(
    <Provider
        store={store}
    >
        <App />
    </Provider>,
    document.getElementById('root')
);