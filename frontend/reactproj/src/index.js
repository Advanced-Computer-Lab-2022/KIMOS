import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {createStore(reducers)}>
        <App />
    </Provider>
);
