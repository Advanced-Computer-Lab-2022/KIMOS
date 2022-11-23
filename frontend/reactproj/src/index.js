import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
 
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
      primary: {
        main: '#D80621',
        },
      secondary: {
        main: '#E33E7F'
      }
    }
  });

root.render(
    <Provider store = {store}>
        <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}> 
          <App />
        </PersistGate>
               
        </ThemeProvider>
    </Provider>
);
