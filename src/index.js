import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import store from './app/store'; // This matches the default export
import { Provider } from 'react-redux';
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
